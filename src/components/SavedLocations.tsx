import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BookmarkPlus, Save, Trash2 } from 'lucide-react';
import { Position } from '../types';

interface SavedLocation {
  id: string;
  name: string;
  position: Position;
  timestamp: string;
}

const DEMO_LOCATIONS: SavedLocation[] = [
  {
    id: '1',
    name: 'New York City',
    position: {
      latitude: 40.7128,
      longitude: -74.0060,
      altitude: 10
    },
    timestamp: '2025-06-08 14:32:18'
  },
  {
    id: '2',
    name: 'Tokyo',
    position: {
      latitude: 35.6762,
      longitude: 139.6503,
      altitude: 5
    },
    timestamp: '2025-06-07 09:12:45'
  },
  {
    id: '3',
    name: 'London',
    position: {
      latitude: 51.5074,
      longitude: -0.1278,
      altitude: 15
    },
    timestamp: '2025-06-05 22:07:33'
  }
];

interface SavedLocationsProps {
  onLocationSelect: (position: Position) => void;
}

const SavedLocations: React.FC<SavedLocationsProps> = ({ onLocationSelect }) => {
  const { theme } = useTheme();
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(DEMO_LOCATIONS);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  
  const handleLocationSelect = (position: Position) => {
    onLocationSelect(position);
  };
  
  const handleDeleteLocation = (id: string) => {
    setSavedLocations(savedLocations.filter(loc => loc.id !== id));
  };
  
  const handleAddLocation = () => {
    if (newLocationName.trim()) {
      const newLocation: SavedLocation = {
        id: Date.now().toString(),
        name: newLocationName,
        position: {
          latitude: 0,
          longitude: 0,
          altitude: 0
        },
        timestamp: new Date().toLocaleString()
      };
      
      setSavedLocations([...savedLocations, newLocation]);
      setNewLocationName('');
      setIsAddingLocation(false);
    }
  };
  
  return (
    <div className={`rounded-xl shadow-lg p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <BookmarkPlus size={18} className="mr-2" />
          <h2 className="text-lg font-semibold">Saved Locations</h2>
        </div>
        <button
          onClick={() => setIsAddingLocation(true)}
          className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-slate-800'
          }`}
        >
          <Save size={14} />
          <span>Save Current</span>
        </button>
      </div>
      
      {isAddingLocation ? (
        <div className="mb-3 flex space-x-2">
          <input
            type="text"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
            placeholder="Location name"
            className={`flex-grow rounded-md px-3 py-2 text-sm ${
              theme === 'dark' 
                ? 'bg-slate-700 border-slate-600' 
                : 'bg-gray-100 border-gray-300'
            } border`}
            autoFocus
          />
          <button
            onClick={handleAddLocation}
            className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => setIsAddingLocation(false)}
            className={`px-3 py-2 rounded-md text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-slate-800'
            }`}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="max-h-40 overflow-y-auto">
          {savedLocations.length === 0 ? (
            <div className={`text-center py-3 rounded-lg ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'
            }`}>
              <p className="text-sm opacity-70">No saved locations</p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedLocations.map((location) => (
                <div 
                  key={location.id}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => handleLocationSelect(location.position)}
                >
                  <div>
                    <p className="font-medium text-sm">{location.name}</p>
                    <p className="text-xs opacity-70">{location.timestamp}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLocation(location.id);
                      }}
                      className={`p-1 rounded transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-slate-500'
                          : 'hover:bg-gray-300'
                      }`}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;