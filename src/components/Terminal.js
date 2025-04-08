import React, { useEffect, useRef } from 'react';

const Terminal = ({ logs }) => {
  const terminalRef = useRef(null);

  // Auto-scroll to the bottom when logs update
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Helper function to get the appropriate CSS class for each log type
  const getLogClass = (type) => {
    switch (type) {
      case 'error':
        return 'terminal-line error';
      case 'warning':
        return 'terminal-line warning';
      case 'success':
        return 'terminal-line success';
      case 'output':
        return 'terminal-line output';
      default:
        return 'terminal-line';
    }
  };

  // Helper to add animation for new log entries
  const getAnimationClass = (index) => {
    const isRecent = index >= logs.length - 3;
    return isRecent ? 'animate-fade-in' : '';
  };

  return (
    <div ref={terminalRef} className="terminal">
      {logs.length === 0 ? (
        <div className="terminal-line opacity-50">Terminal ready. Waiting for input...</div>
      ) : (
        logs.map((log, index) => (
          <div 
            key={index} 
            className={`${getLogClass(log.type)} ${getAnimationClass(index)}`}
          >
            {log.type === 'output' ? log.message : `> ${log.message}`}
          </div>
        ))
      )}
      <div className="terminal-cursor"></div>
    </div>
  );
};

export default Terminal;
