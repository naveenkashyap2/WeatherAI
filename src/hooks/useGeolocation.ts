import { useEffect, useState } from "react";

interface Geo {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [geo, setGeo] = useState<Geo>({ latitude: null, longitude: null, error: null, loading: true });

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeo({ latitude: null, longitude: null, error: "Geolocation not supported", loading: false });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, error: null, loading: false }),
      (err) => setGeo({ latitude: null, longitude: null, error: err.message, loading: false }),
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, []);

  return geo;
}
