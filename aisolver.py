import subprocess
import json
import tempfile
import os

def query_ollama(prompt, model="codellama"):

    command = [
        "ollama", "run", model
    ]


    try:
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,encoding='utf-8',errors='replace')
        output, error = process.communicate(prompt)

        if error and not output:
            print("Error communicating with Ollama:", error)
            return "Error: Could not get response from Ollama model."
        return output
    except Exception as e:
        return f"Error: {str(e)}"

def analyze_code_statically(code):

    results = {"pylint": None, "pyflakes": None}
    
    # Create a temporary file for the code
    with tempfile.NamedTemporaryFile(suffix='.py', delete=False) as temp_file:
        temp_file.write(code.encode('utf-8'))
        temp_filepath = temp_file.name
    
    try:
        try:
            pylint_output = subprocess.run(
                ["pylint", "--output-format=json", temp_filepath],
                capture_output=True, text=True, check=False
            )
            if pylint_output.stdout:
                results["pylint"] = pylint_output.stdout
            else:
                results["pylint"] = pylint_output.stderr
        except FileNotFoundError:
            results["pylint"] = "Pylint not found. Install with: pip install pylint"
        
        # Run pyflakes
        try:
            pyflakes_output = subprocess.run(
                ["pyflakes", temp_filepath],
                capture_output=True, text=True, check=False
            )
            results["pyflakes"] = pyflakes_output.stdout or pyflakes_output.stderr
        except FileNotFoundError:
            results["pyflakes"] = "Pyflakes not found. Install with: pip install pyflakes"
            
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_filepath):
            os.unlink(temp_filepath)
    
    return results

def check_for_imports(code):
    """Extract all imports from the code."""
    imports = set()
    for line in code.splitlines():
        line = line.strip()
        
        # Match 'import module1, module2 as alias2'
        if line.startswith("import"):
            modules = line[len("import"):].split(",")
            for mod in modules:
                mod = mod.strip().split(" as ")[0]
                top_module = mod.split('.')[0]
                imports.add(top_module)
        
        # Match 'from module.submodule import something as alias'
        elif line.startswith("from"):
            import re
            match = re.match(r'^from\s+([\w\.]+)\s+import\s+', line)
            if match:
                full_module = match.group(1)
                top_module = full_module.split('.')[0]
                imports.add(top_module)
    
    return sorted(imports)

def check_syntax_errors(code):
    """Check for Python syntax errors."""
    try:
        compile(code, '<string>', 'exec')
        return None
    except SyntaxError as e:
        return f"SyntaxError: {str(e)}"
    except Exception as e:
        return f"Error: {str(e)}"

def build_prompt(code, static_analysis, imports, syntax_error):
    prompt = f"""
Analyze this code snippet:

{code}

"""
    if syntax_error:
        prompt += f"\nSyntax error detected: {syntax_error}\n"
    
    prompt += """
        1. What does this code do?
        2. Issues detected:
"""
    
    if static_analysis["pylint"] and static_analysis["pylint"] != "Pylint not found. Install with: pip install pylint":
        prompt += f"   - Pylint issues: {static_analysis['pylint']}\n"
    
    if static_analysis["pyflakes"] and static_analysis["pyflakes"] != "Pyflakes not found. Install with: pip install pyflakes":
        prompt += f"   - Pyflakes issues: {static_analysis['pyflakes']}\n"
    
    prompt += """
        3. How to fix the identified issues?
        4. The following packages are needed:
"""
    
    for package in imports:
        prompt += f"   - {package}\n"
    
    prompt += "\nProvide concise, practical advice for improving this code."
    return prompt

if __name__ == "__main__":
    print("=== Code Analyzer & Error Detector ===")
    print("Paste your code below (Enter twice to end):")
    code_lines = []
    while True:
        try:
            line = input()
            if line.strip() == "":
                break
            code_lines.append(line)
        except EOFError:
            break
    
    code = "\n".join(code_lines)
    
    if not code.strip():
        print("No code provided. Exiting.")
        exit(1)
    
    print("\nAnalyzing code...")
    
    # Check for syntax errors
    syntax_error = check_syntax_errors(code)
    if syntax_error:
        print(f"Syntax error detected: {syntax_error}")
    
    # Extract imports
    imports = check_for_imports(code)
    print(f"Detected imports: {', '.join(imports) if imports else 'None'}")
    
    # Run static analysis
    static_analysis = analyze_code_statically(code)
    
    # Generate prompt and query LLM
    prompt = build_prompt(code, static_analysis, imports, syntax_error)
    print("\nConsulting AI model for deeper analysis...")
    response = query_ollama(prompt)
    
    print("\n=== Analysis Results ===\n")
    print(response)
    
    print("\n=== Required Packages ===")
    if imports:
        print("Install with: pip install " + " ".join(imports))
    else:
        print("No external packages detected.")