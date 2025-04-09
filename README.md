# Autosolve

![Autosolve Logo](assets/logo.png)

**LLM-powered problem-solving desktop application**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Development](#development) • [File Structure](#file-structure) • [Technologies](#technologies) • [License](#license)

## Overview

Autosolve is an intelligent desktop application that uses Large Language Models (LLMs) to solve programming problems, automatically install required dependencies, and continue working on issues until they're completely resolved. It provides a clean, modern interface with real-time terminal feedback and a seamless user experience.

## Features

- 🤖 **AI-Powered Problem Solving** - Simply describe your problem, and Autosolve will analyze, troubleshoot, and implement solutions.
- 📦 **Automatic Dependency Management** - Detects and installs required packages and dependencies on the fly.
- 📋 **Real-Time Terminal Output** - Watch the solution process unfold with detailed terminal logs.
- 🔄 **Continuous Problem Solving** - The system persists until your problem is fully resolved, handling errors as they arise.
- 💻 **Cross-Platform Support** - Works on Windows, macOS, and Linux.
- 🔌 **Execute System Commands** - Run and test shell scripts, Python scripts, and system commands directly through the interface.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/autosolve-app.git
   cd autosolve-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the application:
   ```bash
   npm start
   ```

### Building Distributable Packages

To create platform-specific distributable packages:

```bash
npm run make
```

This will generate executables for your current platform in the `out` directory.

## Usage

### Problem Solving

1. Launch the Autosolve application.
2. Navigate to the "Solve" tab.
3. Describe your programming problem or technical issue in the input area.
4. Click "Run Command" to begin the problem-solving process.
5. Monitor the terminal output for real-time progress and results.

### Test Commands

You can try these sample commands to test the application's functionality:


- `list files` - Shows files in the current directory
- `system info` - Displays system information
- `network` - Shows network configuration
- `processes` - Lists running processes
- `run python script` - Executes a sample Python script
- `run shell script` - Runs a batch/shell script depending on your OS

### Navigation

- **Home** - Overview and introduction to Autosolve
- **Solve** - Main problem-solving interface
- **History** - View past problem-solving sessions
- **Settings** - Configure application preferences
- **About** - Information about the application

## Development

### Development Environment

To start the application in development mode:

```bash
npm run dev
```

This will run webpack in watch mode and start Electron with hot reloading.

### Project Structure

The Autosolve app uses Electron for cross-platform desktop support and React for UI components. Tailwind CSS provides styling with a modern, responsive design.
S