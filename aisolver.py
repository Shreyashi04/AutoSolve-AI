import os
import re
import subprocess
import sys
import torch
import tkinter as tk
from tkinter import filedialog, messagebox
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_NAME = "Doctor-Shotgun/TinyLlama-1.1B-32k-Instruct"

def load_model():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    return tokenizer, model, device


def fix_code(model, tokenizer, device, code):
    prompt = f"""
You are a Python fixer. Your job is to:
1. Fix all missing import/module errors.
2. Add only required import statements.
3. Do NOT change any logic or remove any comments.
4. Return ONLY the fixed code.

### Code:
{code}

### Fixed Code:
"""
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=2048).to(device)
    outputs = model.generate(**inputs, max_new_tokens=512, do_sample=True, temperature=0.7)
    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return output_text.split("### Fixed Code:")[-1].strip()

def extract_imports(code):
    pattern = r'^\s*(?:import|from)\s+([a-zA-Z0-9_\.]+)'
    return list(set(re.findall(pattern, code, re.MULTILINE)))

def install_missing(imports):
    for module in imports:
        try:
            __import__(module.split('.')[0])
        except ImportError:
            subprocess.run([sys.executable, "-m", "pip", "install", module.split('.')[0]])

class ImportFixerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Import Fixer (LLM Powered)")
        self.root.geometry("500x250")

        self.label = tk.Label(root, text="Select a Python file to fix import errors:")
        self.label.pack(pady=10)

        self.select_button = tk.Button(root, text="Select File", command=self.select_file)
        self.select_button.pack(pady=5)

        self.fix_button = tk.Button(root, text="Fix & Install", command=self.fix_and_install, state=tk.DISABLED)
        self.fix_button.pack(pady=5)

        self.status = tk.Label(root, text="")
        self.status.pack(pady=20)

        self.file_path = None

    def select_file(self):
        path = filedialog.askopenfilename(filetypes=[("Python Files", "*.py")])
        if path:
            self.file_path = path
            self.status.config(text=f"Selected: {os.path.basename(path)}")
            self.fix_button.config(state=tk.NORMAL)

    def fix_and_install(self):
        if not self.file_path:
            messagebox.showerror("Error", "No file selected.")
            return

        try:
            with open(self.file_path, 'r', encoding='utf-8') as f:
                code = f.read()

            self.status.config(text="🔄 Loading model...")
            self.root.update()

            tokenizer, model, device = load_model()

            self.status.config(text="🛠️ Fixing code...")
            self.root.update()

            fixed_code = fix_code(model, tokenizer, device, code)

            self.status.config(text="📦 Installing modules...")
            self.root.update()

            imports = extract_imports(fixed_code)
            install_missing(imports)

            with open(self.file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_code)

            self.status.config(text="✅ Done! File fixed.")
            messagebox.showinfo("Success", "Imports fixed and modules installed!")

        except Exception as e:
            messagebox.showerror("Error", str(e))
            self.status.config(text="❌ Failed.")

if __name__ == "__main__":
    root = tk.Tk()
    app = ImportFixerApp(root)
    root.mainloop()
