import React from 'react';

// fetch data from storage
const mockHistory = [
  {
    id: '1',
    timestamp: '2023-01-28T14:30:00Z',
    problem: 'Create a Node.js server with Express',
    status: 'solved',
    logs: [
      { message: 'Analyzing problem...', type: 'info' },
      { message: 'Installing express package...', type: 'info' },
      { message: 'Problem solved successfully!', type: 'success' }
    ]
  },
  {
    id: '2',
    timestamp: '2023-01-27T10:15:00Z',
    problem: 'Setup React with TypeScript',
    status: 'solved',
    logs: [
      { message: 'Analyzing problem...', type: 'info' },
      { message: 'Installing typescript...', type: 'info' },
      { message: 'Problem solved successfully!', type: 'success' }
    ]
  }
];

const History = () => {
  const [expandedId, setExpandedId] = React.useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-classic-black">Session History</h1>
      
      {mockHistory.length === 0 ? (
        <p className="text-warm-gray">No history available yet.</p>
      ) : (
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(item.id)}
              >
                <div>
                  <h3 className="text-xl font-bold text-deep-blue">{item.problem}</h3>
                  <p className="text-warm-gray">{formatDate(item.timestamp)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'solved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </div>
              </div>
              
              {expandedId === item.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2 text-classic-black">Session Logs:</h4>
                  <div className="bg-classic-black rounded-md p-3 font-mono text-sm">
                    {item.logs.map((log, index) => (
                      <div key={index} className={`${log.type === 'success' ? 'text-green-400' : 'text-emerald'}`}>
                        &gt; {log.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
