import React, { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Terminal } from 'lucide-react';

interface SystemLogProps {
  logs: Array<{
    id: number;
    message: string;
    timestamp: string;
    type: 'info' | 'warning' | 'error';
  }>;
}

const SystemLog: React.FC<SystemLogProps> = ({ logs }) => {
  const { theme } = useTheme();
  const logEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new logs come in
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);
  
  return (
    <div className={`rounded-xl shadow-lg p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Terminal size={18} className="mr-2" />
          <h2 className="text-lg font-semibold">System Log</h2>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">
          {logs.length} entries
        </span>
      </div>
      
      <div className={`h-40 overflow-y-auto rounded-lg p-2 font-mono text-sm ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'
      }`}>
        {logs.map((log) => (
          <div key={log.id} className="mb-1 flex">
            <span className={`mr-2 ${
              log.type === 'error' 
                ? 'text-red-500' 
                : log.type === 'warning' 
                  ? 'text-yellow-500' 
                  : 'text-blue-500'
            }`}>
              [{log.timestamp}]
            </span>
            <span>{log.message}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default SystemLog;