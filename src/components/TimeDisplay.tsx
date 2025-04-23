import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Clock } from 'lucide-react';

interface TimeDisplayProps {
  gnssTime: string;
  utcTime: string;
  isTimeAvailable: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ 
  gnssTime, 
  utcTime, 
  isTimeAvailable 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-xl shadow-lg p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock size={18} className="mr-2" />
          <h2 className="text-lg font-semibold">Time Information</h2>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-white ${
          isTimeAvailable ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className={`w-2 h-2 rounded-full bg-white ${
            isTimeAvailable ? 'animate-pulse' : ''
          }`}></div>
          <span className="text-xs font-medium">
            {isTimeAvailable ? 'Time Synchronized' : 'Time Unavailable'}
          </span>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg font-mono ${
          theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
        }`}>
          <p className="text-xs opacity-70 mb-1">GNSS Time (GPS week:seconds)</p>
          <p className="text-lg">{gnssTime}</p>
        </div>
        
        <div className={`p-3 rounded-lg font-mono ${
          theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
        }`}>
          <p className="text-xs opacity-70 mb-1">UTC Timestamp (RTC)</p>
          <p className="text-lg">{utcTime}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;