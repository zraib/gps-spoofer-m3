import { useState, useCallback } from 'react';
import { SpoofingState } from '../types';

export const useSpoofingControls = () => {
  const [spoofingState, setSpoofingState] = useState<SpoofingState>({
    isActive: false,
    powerLevel: 10,
    velocity: {
      speed: 0,
      direction: 0
    }
  });
  
  // Update spoofing state
  const updateSpoofingState = useCallback((updates: Partial<SpoofingState>) => {
    setSpoofingState(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Toggle spoofing activation
  const toggleSpoofing = useCallback(() => {
    setSpoofingState(prev => ({ ...prev, isActive: !prev.isActive }));
  }, []);
  
  return {
    spoofingState,
    updateSpoofingState,
    toggleSpoofing
  };
};