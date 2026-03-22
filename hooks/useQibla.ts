import { useState, useEffect, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export function useQibla() {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaDegree, setQiblaDegree] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(true);

  // Math for Qibla
  const calculateQibla = useCallback((lat: number, lng: number) => {
    const toRadians = (deg: number) => (deg * Math.PI) / 180;
    const toDegrees = (rad: number) => (rad * 180) / Math.PI;

    const lat1 = toRadians(lat);
    const lng1 = toRadians(lng);
    const lat2 = toRadians(KAABA_LAT);
    const lng2 = toRadians(KAABA_LNG);

    const deltaLng = lng2 - lng1;

    const y = Math.sin(deltaLng);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLng);
    
    let qiblaRad = Math.atan2(y, x);
    let qiblaDeg = toDegrees(qiblaRad);

    // Normalize to 0-360
    if (qiblaDeg < 0) qiblaDeg += 360;

    setQiblaDegree(Number(qiblaDeg.toFixed(1)));
  }, []);

  const requestCompassPermission = async () => {
    try {
      // @ts-ignore - for iOS 13+ devices
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // @ts-ignore
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setHasPermission(true);
          startCompassListener();
          return true;
        } else {
          setError('Compass permission denied. Please allow it in settings.');
          return false;
        }
      } else {
        // Non-iOS 13+ devices (e.g. Android or standard browser)
        setHasPermission(true);
        startCompassListener();
        return true;
      }
    } catch (err) {
      setError('Failed to request compass permission. Keep device flat.');
      setHasPermission(true); // Attempt to proceed anyway on certain devices
      startCompassListener();
      return true;
    }
  };

  const startCompassListener = useCallback(() => {
    const handler = (e: DeviceOrientationEvent) => {
      // @ts-ignore
      let compassHeading = e.webkitCompassHeading;
      
      // Fallback to absolute alpha
      if (compassHeading === undefined || compassHeading === null) {
        if (e.absolute && e.alpha !== null) {
          compassHeading = 360 - e.alpha; // Convert counterclockwise alpha to clockwise heading
        } else {
          return;
        }
      }
      
      setHeading(Math.round(compassHeading));
      if (isCalibrating) setIsCalibrating(false);
    };

    window.addEventListener('deviceorientationabsolute', handler as EventListener, true);
    window.addEventListener('deviceorientation', handler as EventListener, true);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handler as EventListener, true);
      window.removeEventListener('deviceorientation', handler as EventListener, true);
    };
  }, [isCalibrating]);

  useEffect(() => {
    // 1. Fetch Geolocation via Capacitor
    const getLocationAndQibla = async () => {
      try {
        const hasPermissions = await Geolocation.checkPermissions();
        if (hasPermissions.location !== 'granted') {
          const request = await Geolocation.requestPermissions();
          if (request.location !== 'granted') throw new Error("Location permission denied");
        }
        
        const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        calculateQibla(position.coords.latitude, position.coords.longitude);
        
        // 2. Start Compass
        await requestCompassPermission();
        
      } catch (err: any) {
        // Fallback or display error
        setError(err.message || 'Failed to detect location.');
      }
    };

    getLocationAndQibla();
  }, [calculateQibla]);

  return { heading, qiblaDegree, error, hasPermission, requestCompassPermission, isCalibrating };
}
