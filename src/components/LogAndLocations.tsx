import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Terminal, BookmarkPlus, Save, Trash2, Download } from 'lucide-react';
import { Position } from '../types';

interface LogAndLocationsProps {
  logs: Array<{
    id: number;
    message: string;
    timestamp: string;
    type: 'info' | 'warning' | 'error';
  }>;
  onLocationSelect: (position: Position) => void;
  currentPosition: Position;
}

const LogAndLocations: React.FC<LogAndLocationsProps> = ({ 
  logs, 
  onLocationSelect,
  currentPosition 
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'locations' | 'log'>('locations');
  const [savedLocations, setSavedLocations] = useState([
    {
      id: '1',
      name: 'Default Location',
      position: { latitude: 32.863020, longitude: -6.563644, altitude: 10 },
      timestamp: '2025-06-08 14:32:18'
    }
  ]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');

  const handleSaveLocation = () => {
    if (!isAddingLocation) {
      setNewLocationName('New Location');
      setIsAddingLocation(true);
      return;
    }

    if (newLocationName.trim()) {
      const newLocation = {
        id: Date.now().toString(),
        name: newLocationName.trim(),
        position: { ...currentPosition },
        timestamp: new Date().toLocaleString()
      };
      
      setSavedLocations(prev => [newLocation, ...prev]);
      setIsAddingLocation(false);
      setNewLocationName('');
    }
  };

  const handleExportLogs = () => {
    const logText = logs.map(log => `[${log.timestamp}] ${log.message}`).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gps_spoofer_logs_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`h-[calc(100vh-80px)] rounded-xl shadow-lg flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex p-2 gap-1">
        <button
          onClick={() => setActiveTab('locations')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'locations' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <BookmarkPlus size={16} />
          Locations
        </button>
        <button
          onClick={() => setActiveTab('log')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'log' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <Terminal size={16} />
          Logs
        </button>
      </div>

      <div className="flex-grow p-2">
        {activeTab === 'log' ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-end mb-2">
              <button
                onClick={handleExportLogs}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Download size={12} />
                Export Logs
              </button>
            </div>
            <div className={`flex-grow overflow-y-auto rounded-lg p-2 font-mono text-sm ${
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
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              {isAddingLocation ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newLocationName}
                    onChange={(e) => setNewLocationName(e.target.value)}
                    placeholder="Location name"
                    className={`flex-1 px-2 py-1 text-xs rounded-lg ${
                      theme === 'dark'
                        ? 'bg-slate-700 border-slate-600'
                        : 'bg-gray-100 border-gray-300'
                    } border`}
                    autoFocus
                  />
                  <button
                    onClick={handleSaveLocation}
                    className="px-2 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingLocation(false);
                      setNewLocationName('');
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSaveLocation}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  <Save size={12} />
                  Save Current
                </button>
              )}
            </div>
            <div className="flex-grow overflow-y-auto">
              {savedLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => onLocationSelect(location.position)}
                  className={`mb-2 p-2 rounded-lg cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{location.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSavedLocations(locations => 
                          locations.filter(loc => loc.id !== location.id)
                        );
                      }}
                      className={`p-1 rounded hover:bg-opacity-80`}
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                  <p className="text-xs opacity-70">{location.timestamp}</p>
                  <div className="mt-1 text-xs opacity-70">
                    <div>Lat: {location.position.latitude.toFixed(6)}°</div>
                    <div>Lon: {location.position.longitude.toFixed(6)}°</div>
                    <div>Alt: {location.position.altitude}m</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogAndLocations;