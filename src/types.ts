export interface Position {
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface SystemStatusState {
  gpsReceiverConnected: boolean;
  hackrfConnected: boolean;
  gnssTimeAvailable: boolean;
  satellitesConnected: number;
  isReady: boolean;
}

export interface SpoofingState {
  isActive: boolean;
  powerLevel: number;
  velocity: {
    speed: number;
    direction: number;
  };
}