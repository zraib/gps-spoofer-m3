import { useState, useEffect, useCallback } from 'react';
import { Position } from '../types';

export const useGpsData = () => {
  // Initial GPS data state with the specified coordinates
  const [gpsData, setGpsData] = useState({
    position: {
      latitude: 32.863020,
      longitude: -6.563644,
      altitude: 10
    },
    gnssTime: '2237:345678.00',
    utcTime: '2025-06-10 14:32:18'
  });
  
  // Initial spoofed data state - Same as initial position
  const [spoofedData, setSpoofedData] = useState({
    position: {
      latitude: 32.863020,
      longitude: -6.563644,
      altitude: 10
    },
    velocity: {
      speed: 0,
      direction: 0
    }
  });
  
  // Update real GPS position - simulated with random slight movement
  useEffect(() => {
    const interval = setInterval(() => {
      setGpsData(prev => {
        const latitudeDelta = (Math.random() - 0.5) * 0.0001;
        const longitudeDelta = (Math.random() - 0.5) * 0.0001;
        
        const now = new Date();
        const utcTime = now.toLocaleString();
        
        let gpsWeek = 2237;
        let gpsSec = 345678 + now.getSeconds();
        
        return {
          position: {
            latitude: prev.position.latitude + latitudeDelta,
            longitude: prev.position.longitude + longitudeDelta,
            altitude: prev.position.altitude
          },
          gnssTime: `${gpsWeek}:${gpsSec.toFixed(2)}`,
          utcTime
        };
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const updateSpoofedLocation = useCallback((position: Position) => {
    setSpoofedData(prev => ({
      ...prev,
      position
    }));
  }, []);
  
  return {
    gpsData,
    spoofedData,
    updateSpoofedLocation
  };
};