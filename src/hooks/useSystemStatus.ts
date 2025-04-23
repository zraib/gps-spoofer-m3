import { useState, useEffect, useCallback } from 'react';
import { SystemStatusState } from '../types';

export const useSystemStatus = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatusState>({
    gpsReceiverConnected: false,
    hackrfConnected: false,
    gnssTimeAvailable: false,
    satellitesConnected: 0,
    isReady: false
  });
  
  // Check if system is ready whenever any of the status values change
  useEffect(() => {
    const isReady = (
      systemStatus.gpsReceiverConnected &&
      systemStatus.hackrfConnected &&
      systemStatus.gnssTimeAvailable &&
      systemStatus.satellitesConnected >= 8
    );
    
    if (isReady !== systemStatus.isReady) {
      setSystemStatus(prev => ({ ...prev, isReady }));
    }
  }, [
    systemStatus.gpsReceiverConnected,
    systemStatus.hackrfConnected, 
    systemStatus.gnssTimeAvailable,
    systemStatus.satellitesConnected
  ]);
  
  // Update system status
  const updateSystemStatus = useCallback((updates: Partial<SystemStatusState>) => {
    setSystemStatus(prev => ({ ...prev, ...updates }));
  }, []);
  
  return {
    systemStatus,
    updateSystemStatus
  };
};