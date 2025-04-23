import React, { useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Position } from '../types';
import { useTheme } from '../contexts/ThemeContext';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  realPosition: Position;
  spoofedPosition: Position;
  onPositionSelect: (position: Position) => void;
  spoofingActive: boolean;
}

// Custom markers
const realIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const spoofIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map click handler component
const MapClickHandler: React.FC<{ onPositionSelect: (position: Position) => void }> = ({ onPositionSelect }) => {
  const map = useMapEvents({
    click: (e) => {
      onPositionSelect({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        altitude: 0 // Default altitude
      });
    }
  });
  return null;
};

const Map: React.FC<MapProps> = ({ 
  realPosition, 
  spoofedPosition, 
  onPositionSelect,
  spoofingActive 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg relative">
      <MapContainer
        center={[realPosition.latitude, realPosition.longitude]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onPositionSelect={onPositionSelect} />
        <Marker 
          position={[realPosition.latitude, realPosition.longitude]}
          icon={realIcon}
        />
        <Marker 
          position={[spoofedPosition.latitude, spoofedPosition.longitude]}
          icon={spoofIcon}
          opacity={spoofingActive ? 0.8 : 1}
        />
      </MapContainer>
      
      {/* GPS Location Display */}
      <div className={`absolute bottom-4 left-4 p-3 rounded-lg shadow-lg z-[1000] font-mono text-sm ${
        theme === 'dark' 
          ? 'bg-slate-800 bg-opacity-90 text-white' 
          : 'bg-white bg-opacity-90 text-slate-900'
      }`}>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Current Position</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-xs opacity-70">Lat</span>
                <p>{realPosition.latitude.toFixed(6)}°</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Lon</span>
                <p>{realPosition.longitude.toFixed(6)}°</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Alt</span>
                <p>{realPosition.altitude}m</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Spoofed Position</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-xs opacity-70">Lat</span>
                <p>{spoofedPosition.latitude.toFixed(6)}°</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Lon</span>
                <p>{spoofedPosition.longitude.toFixed(6)}°</p>
              </div>
              <div>
                <span className="text-xs opacity-70">Alt</span>
                <p>{spoofedPosition.altitude}m</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;