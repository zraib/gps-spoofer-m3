import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Map from './components/Map';
import SystemStatusAndTime from './components/SystemStatusAndTime';
import SpoofingControls from './components/SpoofingControls';
import LogAndLocations from './components/LogAndLocations';
import { useSystemStatus } from './hooks/useSystemStatus';
import { useSpoofingControls } from './hooks/useSpoofingControls';
import { useGpsData } from './hooks/useGpsData';
import { useSystemLog } from './hooks/useSystemLog';

function App() {
  const { systemStatus, updateSystemStatus } = useSystemStatus();
  const { spoofingState, updateSpoofingState, toggleSpoofing } = useSpoofingControls();
  const { gpsData, spoofedData, updateSpoofedLocation } = useGpsData();
  const { logs, addLogEntry } = useSystemLog();

  React.useEffect(() => {
    addLogEntry('System initializing...');
    
    const initTimeouts = [
      setTimeout(() => {
        updateSystemStatus({ gpsReceiverConnected: true });
        addLogEntry('GPS Receiver connected');
      }, 1500),
      
      setTimeout(() => {
        updateSystemStatus({ hackrfConnected: true });
        addLogEntry('Transmitter connected');
      }, 2500),
      
      setTimeout(() => {
        updateSystemStatus({ gnssTimeAvailable: true });
        addLogEntry('GNSS Time synchronized');
      }, 3500),
      
      setTimeout(() => {
        updateSystemStatus({ satellitesConnected: 8 });
        addLogEntry('8 satellites connected');
      }, 4500)
    ];
    
    return () => {
      initTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <div className="grid grid-cols-12 gap-2 h-[calc(100vh-80px)]">
          {/* Left Column - Log and Locations */}
          <div className="col-span-3">
            <LogAndLocations
              logs={logs}
              onLocationSelect={updateSpoofedLocation}
              currentPosition={spoofedData.position}
            />
          </div>
          
          {/* Middle Column - Status and Map */}
          <div className="col-span-6 flex flex-col gap-2">
            <SystemStatusAndTime 
              status={systemStatus}
              spoofingActive={spoofingState.isActive}
              gnssTime={gpsData.gnssTime}
              utcTime={gpsData.utcTime}
              isTimeAvailable={systemStatus.gnssTimeAvailable}
            />
            <div className="flex-grow relative">
              <Map 
                realPosition={gpsData.position} 
                spoofedPosition={spoofedData.position}
                onPositionSelect={updateSpoofedLocation}
                spoofingActive={spoofingState.isActive}
              />
            </div>
          </div>
          
          {/* Right Column - Spoofing Controls */}
          <div className="col-span-3">
            <SpoofingControls 
              spoofingState={spoofingState}
              updateSpoofingState={updateSpoofingState}
              toggleSpoofing={toggleSpoofing}
              systemReady={systemStatus.isReady}
              spoofedData={spoofedData}
              updateSpoofedLocation={updateSpoofedLocation}
            />
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;