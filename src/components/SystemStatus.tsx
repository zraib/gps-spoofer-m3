import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Radio, Clock, Satellite, Wifi } from 'lucide-react';
import { SystemStatusState } from '../types';

interface SystemStatusProps {
  status: SystemStatusState;
  spoofingActive: boolean;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ status, spoofingActive }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`rounded-xl shadow-lg p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">System Status</h2>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
          status.isReady 
            ? spoofingActive 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
            : 'bg-yellow-500 text-white'
        }`}>
          <span className="text-sm font-medium">
            {status.isReady 
              ? spoofingActive 
                ? 'SPOOFING'
                : 'READY'
              : 'INITIALIZING'
            }
          </span>
          <div className={`w-2 h-2 rounded-full ${
            status.isReady ? 'bg-white animate-pulse' : 'bg-white'
          }`}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatusItem 
          icon={<Wifi size={18} />}
          label="GPS Receiver" 
          status={status.gpsReceiverConnected} 
          detail="NEO-M8N" 
        />
        <StatusItem 
          icon={<Radio size={18} />}
          label="HackRF" 
          status={status.hackrfConnected} 
          detail="One" 
        />
        <StatusItem 
          icon={<Clock size={18} />}
          label="GNSS Time" 
          status={status.gnssTimeAvailable} 
          detail="Available" 
        />
        <StatusItem 
          icon={<Satellite size={18} />}
          label="Satellites" 
          status={status.satellitesConnected >= 8} 
          detail={`${status.satellitesConnected}/8`} 
        />
      </div>
    </div>
  );
};

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  status: boolean;
  detail: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, label, status, detail }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex items-center p-3 rounded-lg transition-colors ${
      theme === 'dark'
        ? status 
          ? 'bg-slate-700' 
          : 'bg-slate-700 bg-opacity-50'
        : status 
          ? 'bg-gray-100' 
          : 'bg-gray-100 bg-opacity-50'
    }`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
        status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className={`text-xs ${
          theme === 'dark' 
            ? status ? 'text-green-400' : 'text-red-400' 
            : status ? 'text-green-600' : 'text-red-600'
        }`}>
          {status ? detail : 'Disconnected'}
        </p>
      </div>
    </div>
  );
};

export default SystemStatus;