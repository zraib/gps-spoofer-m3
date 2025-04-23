import React, { useState, useRef } from 'react';
import { MapPin, TrendingUp, Upload, Power, Gauge } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { SpoofingState, Position } from '../types';

interface SpoofingControlsProps {
  spoofingState: SpoofingState;
  updateSpoofingState: (updates: Partial<SpoofingState>) => void;
  toggleSpoofing: () => void;
  systemReady: boolean;
  spoofedData: {
    position: Position;
    velocity: {
      speed: number;
      direction: number;
    };
  };
  updateSpoofedLocation: (position: Position) => void;
}

const SpoofingControls: React.FC<SpoofingControlsProps> = ({
  spoofingState,
  updateSpoofingState,
  toggleSpoofing,
  systemReady,
  spoofedData,
  updateSpoofedLocation
}) => {
  const { theme } = useTheme();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handlePositionChange = (field: keyof Position, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateSpoofedLocation({
        ...spoofedData.position,
        [field]: numValue
      });
    }
  };
  
  const handlePowerLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    updateSpoofingState({ powerLevel: value });
  };
  
  const handleVelocityChange = (field: 'speed' | 'direction', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateSpoofingState({
        velocity: {
          ...spoofingState.velocity,
          [field]: numValue
        }
      });
    }
  };
  
  const handleSpoofingToggle = () => {
    if (spoofingState.isActive) {
      setShowConfirmation(true);
    } else {
      toggleSpoofing();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the GNSS data file here
      console.log('Selected file:', file.name);
    }
  };
  
  return (
    <div className={`h-[calc(100vh-80px)] rounded-xl shadow-lg p-3 flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <h2 className="text-base font-semibold mb-3">Spoofing Controls</h2>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Position Controls */}
          <div>
            <div className="flex items-center mb-2">
              <MapPin size={14} className="mr-1" />
              <h3 className="text-sm font-medium">Position</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-xs mb-1">Latitude (°)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={spoofedData.position.latitude}
                  onChange={(e) => handlePositionChange('latitude', e.target.value)}
                  className={`w-full rounded-md px-2 py-1 text-xs ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-gray-100 border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Longitude (°)</label>
                <input
                  type="number"
                  step="0.000001"
                  value={spoofedData.position.longitude}
                  onChange={(e) => handlePositionChange('longitude', e.target.value)}
                  className={`w-full rounded-md px-2 py-1 text-xs ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-gray-100 border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Altitude (m)</label>
                <input
                  type="number"
                  value={spoofedData.position.altitude}
                  onChange={(e) => handlePositionChange('altitude', e.target.value)}
                  className={`w-full rounded-md px-2 py-1 text-xs ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-gray-100 border-gray-300'
                  } border`}
                />
              </div>
            </div>
          </div>
          
          {/* Velocity Controls */}
          <div>
            <div className="flex items-center mb-2">
              <TrendingUp size={14} className="mr-1" />
              <h3 className="text-sm font-medium">Velocity</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1">Speed (m/s)</label>
                <input
                  type="number"
                  min="0"
                  value={spoofingState.velocity.speed}
                  onChange={(e) => handleVelocityChange('speed', e.target.value)}
                  className={`w-full rounded-md px-2 py-1 text-xs ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-gray-100 border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Direction (°)</label>
                <input
                  type="number"
                  min="0"
                  max="359"
                  value={spoofingState.velocity.direction}
                  onChange={(e) => handleVelocityChange('direction', e.target.value)}
                  className={`w-full rounded-md px-2 py-1 text-xs ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-gray-100 border-gray-300'
                  } border`}
                />
              </div>
            </div>
          </div>
          
          {/* Signal Power */}
          <div>
            <div className="flex items-center mb-2">
              <Gauge size={14} className="mr-1" />
              <h3 className="text-sm font-medium">Signal Power</h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={spoofingState.powerLevel}
                onChange={handlePowerLevelChange}
                className="flex-grow h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, 
                    ${theme === 'dark' ? '#3b82f6' : '#60a5fa'} 0%, 
                    ${theme === 'dark' ? '#3b82f6' : '#60a5fa'} ${(spoofingState.powerLevel / 25) * 100}%, 
                    ${theme === 'dark' ? '#334155' : '#e2e8f0'} ${(spoofingState.powerLevel / 25) * 100}%, 
                    ${theme === 'dark' ? '#334155' : '#e2e8f0'} 100%)`
                }}
              />
              <span className="text-xs font-medium">{spoofingState.powerLevel} dB</span>
            </div>
          </div>
          
          {/* GNSS Data File */}
          <div>
            <div className="flex items-center mb-2">
              <Upload size={14} className="mr-1" />
              <h3 className="text-sm font-medium">GNSS Data File</h3>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.csv,.nmea"
              onChange={handleFileChange}
              className="hidden"
            />
            <button 
              onClick={handleFileSelect}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-slate-800'
              }`}
            >
              Load GNSS Data File
            </button>
          </div>
        </div>
        
        {/* Spoofing Toggle Button */}
        <button
          onClick={handleSpoofingToggle}
          disabled={!systemReady}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all mt-4 ${
            !systemReady
              ? `${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'} opacity-50 cursor-not-allowed`
              : spoofingState.isActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Power size={16} />
          <span className="text-sm">{spoofingState.isActive ? 'Stop Spoofing' : 'Start Spoofing'}</span>
        </button>
      </div>
      
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl shadow-xl p-6 max-w-md ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white'
          }`}>
            <h3 className="text-lg font-semibold mb-3">Confirm Action</h3>
            <p className="mb-4">Are you sure you want to stop the spoofing transmission?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  toggleSpoofing();
                  setShowConfirmation(false);
                }}
                className="flex-1 py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Yes, Stop Spoofing
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-slate-800'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpoofingControls;