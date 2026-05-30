import { useCallback, useEffect, useState } from "react";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
  generateMockWeather,
  generateMockForecast,
} from "../services/weatherApi";

export function useWeather(city?: string, coords?: { lat: number; lon: number } | null) {
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let currentData: any;
      let forecastData: any;
      try {
        currentData = coords
          ? await fetchWeatherByCoords(coords.lat, coords.lon)
          : await fetchCurrentWeather(city || "India");
        forecastData = coords
          ? await fetchForecastByCoords(coords.lat, coords.lon)
          : await fetchForecast(city || "India");
      } catch (e: any) {
        // Fall back to mock data so UI still works without valid API key
        console.warn("Weather API failed, using mock data:", e?.message);
        currentData = generateMockWeather(city || "India");
        forecastData = generateMockForecast(city || "India");
      }
      setCurrent(currentData);
      setForecast(forecastData);
    } catch (e: any) {
      setError(e?.message || "Unable to load weather.");
    } finally {
      setLoading(false);
    }
  }, [city, coords?.lat, coords?.lon]);

  useEffect(() => {
    load();
  }, [load]);

  return { current, forecast, loading, error, reload: load };
}
