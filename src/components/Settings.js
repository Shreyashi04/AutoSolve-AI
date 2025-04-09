import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState('https://api.example.com/autosolve');
  
  const handleSave = () => {
    alert('Settings saved successfully!');
  };
  
  const handleReset = () => {
    setDarkMode(true);
    setNotifications(true);
    setApiEndpoint('https://api.example.com/autosolve');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-classic-black">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-deep-blue">Appearance</h2>
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="relative w-11 h-6 bg-warm-gray rounded-full peer peer-checked:bg-deep-blue peer-focus:ring-2 peer-focus:ring-blue-300">
                <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${darkMode ? 'translate-x-5' : ''}`}></div>
              </div>
              <span className="ml-3 text-classic-black">Dark Mode</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-deep-blue">Notifications</h2>
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="relative w-11 h-6 bg-warm-gray rounded-full peer peer-checked:bg-deep-blue peer-focus:ring-2 peer-focus:ring-blue-300">
                <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${notifications ? 'translate-x-5' : ''}`}></div>
              </div>
              <span className="ml-3 text-classic-black">Enable Notifications</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-deep-blue">API Settings</h2>
          <div>
            <label htmlFor="api-endpoint" className="block mb-2 text-classic-black">
              API Endpoint URL
            </label>
            <input 
              type="text" 
              id="api-endpoint"
              className="input-primary"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button onClick={handleSave} className="btn-primary">
            Save Settings
          </button>
          <button 
            onClick={handleReset} 
            className="bg-warm-gray text-white py-2 px-6 rounded-md font-bold uppercase transition-all duration-200 hover:bg-gray-500"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
