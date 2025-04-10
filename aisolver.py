import os
import re
import subprocess
import sys
import torch
import logging
import tkinter as tk
from tkinter import filedialog, messagebox
from transformers import AutoTokenizer, AutoModelForCausalLM

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# ===== LLM Config =====
MODEL_NAME = "Doctor-Shotgun/TinyLlama-1.1B-32k-Instruct"

def load_model():
    logger.info("🧠 Loading tokenizer and model...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    logger.info(f"✅ Model loaded on: {device}")
    return tokenizer, model, device

def fix_code(model, tokenizer, device, code):
    logger.info("🛠 Generating fixed code using LLM...")
    prompt = f"""
Fix all import/module errors in this Python code.
Just return the full corrected code, no explanations.

### Code:
{code}

### Fixed Code:
"""
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=2048).to(device)
    outputs = model.generate(**inputs, max_new_tokens=512, do_sample=True, temperature=0.7)
    output_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    fixed_code = output_text.split("### Fixed Code:")[-1].strip()
    logger.info("✅ Code fixed.")
    return fixed_code

def extract_imports(code):
    logger.info("🔍 Extracting imports...")
    imports = set()

    py_pattern = r'^\s*(?:import|from)\s+([a-zA-Z0-9_\.]+)'
    imports.update(re.findall(py_pattern, code, re.MULTILINE))

    js_pattern = r"(?:require\(['\"]|import .* from ['\"])([a-zA-Z0-9_\-\.\/@]+)['\"]"
    imports.update(re.findall(js_pattern, code))

    java_pattern = r'^\s*import\s+([a-zA-Z0-9_\.]+);'
    imports.update(re.findall(java_pattern, code, re.MULTILINE))

    imports = list(set(imports))
    logger.info(f"📦 Detected imports: {imports}")
    return imports

def install_missing(imports):
    for module in imports:
        base = module.split('.')[0].split('/')[0].split('@')[-1]

        if base == 'java' or '.' in base:
            logger.info(f"🔁 Skipping Java module: {base}")
            continue

        try:
            __import__(base)
            logger.info(f"✅ Python module already installed: {base}")
        except ImportError:
            logger.warning(f"📦 Missing Python module: {base}. Attempting installation...")
            result = subprocess.run(
                [sys.executable, "-m", "pip", "install", base],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            if result.returncode == 0:
                logger.info(f"✅ Installed via pip: {base}")
            else:
                logger.warning(f"❌ pip failed for {base}, trying npm...")
                npm_result = subprocess.run(
                    ["npm", "install", base],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    text=True
                )
                if npm_result.returncode == 0:
                    logger.info(f"✅ Installed via npm: {base}")
                else:
                    logger.error(f"❌ Failed to install {base} via pip and npm")


class ImportFixerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Import Fixer (LLM Powered)")
        self.root.geometry("500x250")

        self.label = tk.Label(root, text="Select a code file to fix import/module errors:")
        self.label.pack(pady=10)

        self.select_button = tk.Button(root, text="Select File", command=self.select_file)
        self.select_button.pack(pady=5)

        self.fix_button = tk.Button(root, text="Fix & Install", command=self.fix_and_install, state=tk.DISABLED)
        self.fix_button.pack(pady=5)

        self.status = tk.Label(root, text="")
        self.status.pack(pady=20)

        self.file_path = None

    def select_file(self):
        path = filedialog.askopenfilename(filetypes=[("Code Files", "*.py *.js *.java")])
        if path:
            self.file_path = path
            self.status.config(text=f"Selected: {os.path.basename(path)}")
            self.fix_button.config(state=tk.NORMAL)
            logger.info(f"📂 Selected file: {self.file_path}")

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
            logger.info("🎉 All done!")

        except Exception as e:
            messagebox.showerror("Error", str(e))
            logger.exception("❌ Failed during fixing process")
            self.status.config(text="❌ Failed.")

# Run GUI
if __name__ == "__main__":
    root = tk.Tk()
    app = ImportFixerApp(root)
    root.mainloop()
