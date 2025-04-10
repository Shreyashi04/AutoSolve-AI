# 🛠️ Python Import Fixer (LLM-Powered)

A simple GUI-based tool that automatically fixes missing import/module errors in Python scripts using a local LLM (TinyLlama). It analyzes your code, adds necessary imports, and installs the required packages — all with one click.

---

## 📸 Preview

> _Dark mode support, LLM-powered import fixing, and instant pip installation_  
> *(See screenshots in the `screenshots/` folder if included)*

---

## 🚀 Features

- ✔️ Local LLM-based Python code repair (no internet API calls)
- ✔️ Automatically adds **missing imports**
- ✔️ Installs **required Python packages**
- ✔️ Simple GUI built with **Tkinter**
- ✔️ Offline functionality (with locally downloaded model)

---

## 🧠 Model Used

- **[TinyLlama-1.1B-32k-Instruct](https://huggingface.co/Doctor-Shotgun/TinyLlama-1.1B-32k-Instruct)** from HuggingFace

---

## 🧰 Requirements

Make sure you have the following installed:

```bash
pip install torch transformers tkinter
