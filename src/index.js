const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const childProcess = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Determine if in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools in development.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // In development, run webpack before creating the window
  if (isDev) {
    try {
      console.log('Running webpack...');
      childProcess.execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to run webpack:', error);
    }
  }
  
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process code.
// Handle solving problems via IPC
ipcMain.on('solve-problem', (event, problem) => {
  // Log the received problem
  console.log('Solving problem:', problem);
  
  // Function to send terminal updates to the renderer
  const sendUpdate = (message, type = 'info') => {
    event.sender.send('terminal-update', { message, type });
  };
  
  // Send initial status update
  sendUpdate('Starting to process your request...', 'info');
  
  // Determine which command to execute based on platform and problem
  let command = '';
  
  // Check for specific script execution requests
  if (problem.toLowerCase().includes('run python script') || problem.toLowerCase().includes('test python')) {
    const scriptPath = path.join(app.getAppPath(), 'test_scripts', 'test_script.py');
    sendUpdate(`Attempting to run Python script: ${scriptPath}`, 'info');
    command = `python "${scriptPath}"`;
  } 
  else if (problem.toLowerCase().includes('run shell script') || problem.toLowerCase().includes('test shell') || problem.toLowerCase().includes('run bash')) {
    // For Windows, prioritize the batch script
    if (process.platform === 'win32') {
      const batchScriptPath = path.join(app.getAppPath(), 'test_scripts', 'test_script.bat');
      sendUpdate(`Attempting to run batch script: ${batchScriptPath}`, 'info');
      command = `"${batchScriptPath}"`;
    } else {
      // For Unix-like systems, use bash script
      const shellScriptPath = path.join(app.getAppPath(), 'test_scripts', 'test_script.sh');
      sendUpdate(`Attempting to run shell script: ${shellScriptPath}`, 'info');
      command = `bash "${shellScriptPath}" || sh "${shellScriptPath}"`;
    }
  }
  // Regular commands based on platform
  else if (process.platform === 'win32') {
    // Windows commands
    if (problem.toLowerCase().includes('list files')) {
      command = 'dir';
    } else if (problem.toLowerCase().includes('system info')) {
      command = 'systeminfo';
    } else if (problem.toLowerCase().includes('network')) {
      command = 'ipconfig /all';
    } else if (problem.toLowerCase().includes('processes')) {
      command = 'tasklist';
    } else {
      command = 'echo Hello from Command Prompt! & echo This is just a test to see if terminal commands are working.';
    }
  } else {
    // Unix/Linux/macOS commands
    if (problem.toLowerCase().includes('list files')) {
      command = 'ls -la';
    } else if (problem.toLowerCase().includes('system info')) {
      command = 'uname -a';
    } else if (problem.toLowerCase().includes('network')) {
      command = 'ifconfig || ip addr';
    } else if (problem.toLowerCase().includes('processes')) {
      command = 'ps aux';
    } else {
      command = 'echo "Hello from Terminal! This is just a test to see if terminal commands are working."';
    }
  }
  
  // Send command that will be executed
  sendUpdate(`Executing command: ${command}`, 'info');
  
  // Execute the command with error handling
  try {
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        sendUpdate(`Error: ${error.message}`, 'error');
        
        // If bash fails on Windows, try running the batch script as fallback
        if (process.platform === 'win32' && 
            (problem.toLowerCase().includes('run shell script') || 
             problem.toLowerCase().includes('test shell') || 
             problem.toLowerCase().includes('run bash'))) {
          
          sendUpdate('Trying fallback to batch script...', 'info');
          const batchScriptPath = path.join(app.getAppPath(), 'test_scripts', 'test_script.bat');
          const fallbackCommand = `"${batchScriptPath}"`;
          
          sendUpdate(`Executing fallback: ${fallbackCommand}`, 'info');
          childProcess.exec(fallbackCommand, (fallbackError, fallbackStdout, fallbackStderr) => {
            if (fallbackError) {
              sendUpdate(`Fallback error: ${fallbackError.message}`, 'error');
              return;
            }
            
            if (fallbackStderr) {
              sendUpdate(`Fallback stderr: ${fallbackStderr}`, 'warning');
            }
            
            // Process and send fallback output
            const fallbackLines = fallbackStdout.split('\n');
            fallbackLines.forEach(line => {
              if (line.trim()) {
                sendUpdate(line, 'output');
              }
            });
            
            sendUpdate('Fallback script executed successfully!', 'success');
          });
          
          return;
        }
        
        return;
      }
      
      if (stderr) {
        sendUpdate(`stderr: ${stderr}`, 'warning');
      }
      
      // Split stdout by lines and send each line as a separate update
      const lines = stdout.split('\n');
      lines.forEach(line => {
        if (line.trim()) {
          sendUpdate(line, 'output');
        }
      });
      
      sendUpdate('Command executed successfully!', 'success');
    });
  } catch (execError) {
    sendUpdate(`Execution error: ${execError.message}`, 'error');
  }
});
