import { useState, useEffect, useCallback, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export function useQibla() {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaDegree, setQiblaDegree] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(true);
  const [isManual, setIsManual] = useState<boolean>(false);
  const sensorTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const setManualHeading = useCallback((newHeading: number) => {
    setIsManual(true);
    // Normalize to 0-360
    let normalized = newHeading % 360;
    if (normalized < 0) normalized += 360;
    setHeading(normalized);
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
          compassHeading = 360 - e.alpha; 
        } else if (e.alpha !== null) {
          // Some web browsers provide alpha but not 'absolute'
          compassHeading = 360 - e.alpha;
        } else {
          return;
        }
      }
      
      if (!isManual) {
        setHeading(Math.round(compassHeading));
        if (isCalibrating) setIsCalibrating(false);
      }

      // Clear the "Calculating..." or "Manual" state if we get real data
      if (sensorTimeout.current) clearTimeout(sensorTimeout.current);
    };

    // If no sensor data after 2 seconds, assume manual mode
    sensorTimeout.current = setTimeout(() => {
      if (isCalibrating) {
        setIsManual(true);
        setIsCalibrating(false);
      }
    }, 2500);

    window.addEventListener('deviceorientationabsolute', handler as EventListener, true);
    window.addEventListener('deviceorientation', handler as EventListener, true);

    return () => {
      if (sensorTimeout.current) clearTimeout(sensorTimeout.current);
      window.removeEventListener('deviceorientationabsolute', handler as EventListener, true);
      window.removeEventListener('deviceorientation', handler as EventListener, true);
    };
  }, [isCalibrating, isManual]);

  useEffect(() => {
    // 1. Fetch Geolocation via Capacitor
    const getLocationAndQibla = async () => {
      try {
        let latitude, longitude;

        try {
          // Try Capacitor first
          const hasPermissions = await Geolocation.checkPermissions();
          if (hasPermissions.location !== 'granted') {
            await Geolocation.requestPermissions();
          }
          const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        } catch (capErr) {
          // Web Fallback if Capacitor fails or not implemented
          const pos: any = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          latitude = pos.coords.latitude;
          longitude = pos.coords.longitude;
        }

        if (latitude && longitude) {
          calculateQibla(latitude, longitude);
        }
        
        // 2. Start Compass
        await requestCompassPermission();
        
      } catch (err: any) {
        setError('লোকেশন পাওয়া যায়নি। অনুগ্রহ করে পারমিশন দিন।');
      }
    };

    getLocationAndQibla();
  }, [calculateQibla]);

  return { heading, qiblaDegree, error, hasPermission, requestCompassPermission, isCalibrating, isManual, setManualHeading };
}
