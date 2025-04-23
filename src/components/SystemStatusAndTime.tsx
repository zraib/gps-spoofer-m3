import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Radio, Clock, Satellite, Wifi } from 'lucide-react';
import { SystemStatusState } from '../types';

interface SystemStatusAndTimeProps {
  status: SystemStatusState;
  spoofingActive: boolean;
  gnssTime: string;
  utcTime: string;
  isTimeAvailable: boolean;
}

const SystemStatusAndTime: React.FC<SystemStatusAndTimeProps> = ({ 
  status, 
  spoofingActive,
  gnssTime,
  utcTime,
  isTimeAvailable
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-xl shadow-lg p-2 lg:p-3 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-2">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">System Status</h2>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              status.isReady 
                ? spoofingActive 
                  ? 'bg-red-500 text-white' 
                  : 'bg-green-500 text-white'
                : 'bg-yellow-500 text-white'
            }`}>
              <span className="text-xs font-medium">
                {status.isReady 
                  ? spoofingActive 
                    ? 'SPOOFING'
                    : 'READY'
                  : 'INITIALIZING'
                }
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${
                status.isReady ? 'bg-white animate-pulse' : 'bg-white'
              }`}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <StatusItem 
              icon={<Wifi size={16} />}
              label="GPS" 
              status={status.gpsReceiverConnected} 
            />
            <StatusItem 
              icon={<Radio size={16} />}
              label="Transmitter" 
              status={status.hackrfConnected} 
            />
            <StatusItem 
              icon={<Clock size={16} />}
              label="Time" 
              status={status.gnssTimeAvailable} 
            />
            <StatusItem 
              icon={<Satellite size={16} />}
              label="Satellites" 
              status={status.satellitesConnected >= 8} 
              detail={`${status.satellitesConnected}/8`} 
            />
          </div>
        </div>
        
        <div className="flex-1 lg:ml-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-semibold">Time Information</h2>
            <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-white text-xs ${
              isTimeAvailable ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full bg-white ${
                isTimeAvailable ? 'animate-pulse' : ''
              }`}></div>
              <span className="text-xs">{isTimeAvailable ? 'Sync' : 'No Sync'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded-lg font-mono text-sm ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <p className="text-xs opacity-70">GNSS Time</p>
              <p>{gnssTime}</p>
            </div>
            <div className={`p-2 rounded-lg font-mono text-sm ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <p className="text-xs opacity-70">UTC Time</p>
              <p>{utcTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  status: boolean;
  detail?: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, label, status, detail }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center p-2 rounded-lg transition-colors ${
      theme === 'dark'
        ? status 
          ? 'bg-slate-700' 
          : 'bg-slate-700 bg-opacity-50'
        : status 
          ? 'bg-gray-100' 
          : 'bg-gray-100 bg-opacity-50'
    }`}>
      <div className={`flex items-center justify-center w-6 h-6 rounded-full mr-2 ${
        status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium">{label}</p>
        <p className={`text-xs ${
          theme === 'dark' 
            ? status ? 'text-green-400' : 'text-red-400' 
            : status ? 'text-green-600' : 'text-red-600'
        }`}>
          {status ? (detail || 'OK') : 'Off'}
        </p>
      </div>
    </div>
  );
};

export default SystemStatusAndTime;