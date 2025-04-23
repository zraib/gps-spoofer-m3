import { useState, useCallback, useEffect } from 'react';

interface LogEntry {
  id: number;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
}

export const useSystemLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      message: 'System initializing...',
      timestamp: getCurrentTimestamp(),
      type: 'info'
    }
  ]);
  
  // Function to add a new log entry
  const addLogEntry = useCallback((
    message: string, 
    type: 'info' | 'warning' | 'error' = 'info'
  ) => {
    setLogs(prev => [
      ...prev,
      {
        id: Date.now(), // Use timestamp as id
        message,
        timestamp: getCurrentTimestamp(),
        type
      }
    ]);
  }, []);
  
  // Limit logs to last 100 entries to prevent memory issues
  useEffect(() => {
    if (logs.length > 100) {
      setLogs(logs.slice(logs.length - 100));
    }
  }, [logs]);
  
  return {
    logs,
    addLogEntry
  };
};

// Helper function to get current timestamp
function getCurrentTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString();
}