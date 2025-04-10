Here’s a clean and clear **README** file with steps for your Python Import Fixer GUI tool powered by an LLM:

---

# 🧠 Python Import Fixer (LLM Powered)

A desktop tool to automatically fix missing or broken import/module errors in Python, JavaScript, and Java files using a Transformer-based LLM. It also installs any missing modules via `pip` or `npm`.

---

## 🚀 Features

- Detects and fixes import/module errors in code using **TinyLlama-1.1B-32k-Instruct**
- Installs missing packages using `pip` (for Python) or `npm` (for JS)
- Supports `.py`, `.js`, and `.java` files
- User-friendly **Tkinter GUI**
- Cross-platform compatible

---

## 🧰 Requirements

- Python 3.8+
- `torch`
- `transformers`
- `tkinter` (usually comes preinstalled)
- `pip`
- `npm` (for JS package installation)

Install the Python dependencies with:

```bash
pip install torch transformers
```

Make sure `npm` is installed and available in your system PATH. You can verify with:

```bash
npm -v
```

---

## 📦 Model Used

> [`Doctor-Shotgun/TinyLlama-1.1B-32k-Instruct`](https://huggingface.co/Doctor-Shotgun/TinyLlama-1.1B-32k-Instruct)

---

## 🖥️ How to Use

1. Clone this repository or download the script:

   ```bash
   git clone https://github.com/your-username/import-fixer-llm.git
   cd import-fixer-llm
   ```

2. Run the script:

   ```bash
   python aisolver.py
   ```

3. Select your `.py`, `.js`, or `.java` code file from the file dialog.

4. Click **“Fix & Install”**.
   - The LLM will analyze your code and correct import/module errors.
   - Missing dependencies will be auto-installed.
   - The updated code will overwrite the original file.

---

## 📁 Project Structure

```
aisolver.py       # Main GUI and logic
README.md                 # You are here!
```

---

## ⚠️ Notes

- The model is large. It may take some time to load the first time.
- The tool does **not** currently support resolving file path errors or circular imports.
- You need internet access for:
  - Downloading the model from Hugging Face
  - Installing packages

---

## 🧠 Example

Here’s what happens under the hood:

```python
# Before
import numppy  # misspelled

# After LLM Fix
import numpy
```

And it will install `numpy` if it's not installed.

---

## 🛡️ License

MIT License © 2025
