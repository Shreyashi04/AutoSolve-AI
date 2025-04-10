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
    to_install = []
    for module in imports:
        base = module.split('.')[0]
        try:
            __import__(base)
        except ImportError:
            to_install.append(base)

    if to_install:
        install_cmd = f"{sys.executable} -m pip install " + " ".join(to_install)
        print(f"\n📦 Suggested terminal command:\n{install_cmd}\n")
        subprocess.run([sys.executable, "-m", "pip", "install", *to_install])
    else:
        print("✅ All modules already installed.")

# ===== Tkinter UI =====
# ... (your import section remains unchanged)

# ===== Tkinter UI with Better Layout and Styling =====
class ImportFixerApp:
    def _init_(self, root):
        self.root = root
        self.root.title("🔧 Python Import Fixer using LLM")
        self.root.geometry("600x300")
        self.root.resizable(False, False)

        # Style settings
        self.root.configure(bg="#f7f7f7")
        font_title = ("Helvetica", 16, "bold")
        font_label = ("Helvetica", 12)
        font_button = ("Helvetica", 11)

        # Title label
        self.label = tk.Label(root, text="📂 Select a Python file to fix missing imports", font=font_title, bg="#f7f7f7", fg="#333")
        self.label.pack(pady=(20, 10))

        # Buttons
        self.select_button = tk.Button(root, text="📁 Select File", font=font_button, width=20, command=self.select_file, bg="#4285F4", fg="white", activebackground="#3367D6")
        self.select_button.pack(pady=5)

        self.fix_button = tk.Button(root, text="⚙️ Fix & Install Imports", font=font_button, width=20, command=self.fix_and_install, state=tk.DISABLED, bg="#0F9D58", fg="white", activebackground="#0B8043")
        self.fix_button.pack(pady=5)

        # Status Label
        self.status = tk.Label(root, text="", font=font_label, bg="#f7f7f7", fg="#555")
        self.status.pack(pady=(30, 10))

        self.file_path = None

    def select_file(self):
        path = filedialog.askopenfilename(filetypes=[("Python Files", "*.py")])
        if path:
            self.file_path = path
            self.status.config(text=f"📄 Selected: {os.path.basename(path)}")
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

            self.status.config(text="📦 Installing missing packages...")
            self.root.update()
            imports = extract_imports(fixed_code)
            install_missing(imports)

            with open(self.file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_code)

            self.status.config(text="✅ Success! Code updated.")
            messagebox.showinfo("Success", "✔️ Fixed imports and installed missing packages!")

        except Exception as e:
            messagebox.showerror("Error", str(e))
            self.status.config(text="❌ Something went wrong.")

# Run the GUI
if __name__ == "__main__":
    root = tk.Tk()
    app = ImportFixerApp(root)
    root.mainloop()