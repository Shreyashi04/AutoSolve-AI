import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';
const { ipcRenderer } = window.require('electron');

const ProblemSolver = () => {
  const [problem, setProblem] = useState('');
  const [logs, setLogs] = useState([]);
  const [isSolving, setIsSolving] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    // Listen for terminal updates from the main process
    const handleTerminalUpdate = (event, log) => {
      setLogs(prevLogs => [...prevLogs, log]);
      
      // If we receive a success message, we're done solving
      if (log.type === 'success') {
        setIsSolving(false);
      }
    };

    ipcRenderer.on('terminal-update', handleTerminalUpdate);

    // Set initial suggestion
    setProblem('Try typing "list files" or "system info" or "network" or "processes" to test terminal commands');

    // Clean up event listener
    return () => {
      ipcRenderer.removeListener('terminal-update', handleTerminalUpdate);
    };
  }, []);

  // Loading dots animation
  useEffect(() => {
    if (isSolving) {
      const interval = setInterval(() => {
        setLoadingDots(prev => (prev.length >= 3 ? '' : prev + '.'));
      }, 400);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [isSolving]);

  const handleSolve = () => {
    if (!problem.trim()) return;
    
    // Clear previous logs and set solving state
    setLogs([]);
    setIsSolving(true);
    
    // Send the problem to the main process
    ipcRenderer.send('solve-problem', problem);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-classic-black">Problem Solver</h1>
      
      <div className="mb-6">
        <label htmlFor="problem" className="block mb-2 font-medium text-classic-black">
          Describe your problem or enter a test command:
        </label>
        <textarea
          id="problem"
          className="input-primary h-32"
          placeholder="Try typing 'list files' or 'system info' to test terminal commands..."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          disabled={isSolving}
        ></textarea>
      </div>
      
      <div className="mb-6">
        <button 
          className="btn-primary relative"
          onClick={handleSolve}
          disabled={isSolving || !problem.trim()}
        >
          {isSolving ? (
            <span>
              Executing{loadingDots}
              <span className="ml-1 opacity-0">...</span>
            </span>
          ) : 'Run Command'}
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-classic-black">Terminal Output</h2>
          {isSolving && (
            <span className="text-emerald text-sm animate-pulse">Processing...</span>
          )}
        </div>
        <Terminal logs={logs} />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-2 text-deep-blue">Test Commands</h3>
        <ul className="list-disc pl-5 text-warm-gray">
          <li>Type "list files" to see files in the current directory</li>
          <li>Type "system info" to get information about your system</li>
          <li>Type "network" to see network configuration</li>
          <li>Type "processes" to see running processes</li>
          <li>Type "run python script" to test Python script execution</li>
          <li>Type "run shell script" to test shell/batch script execution</li>
        </ul>
        <p className="mt-2 text-sm italic text-warm-gray">
          Note: On Windows systems, the "run shell script" command will use a .bat file
        </p>
      </div>
    </div>
  );
};

export default ProblemSolver;
