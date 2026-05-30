import axios from "axios";

// OpenWeather free API key (public demo / community key).
// Users can override by saving their own key in localStorage under "weatherai-api-key".
const DEFAULT_API_KEY = "0c84d7a33f8dcb6b6efbf4f07c43db6d";

export const getApiKey = () =>
  (typeof window !== "undefined" && localStorage.getItem("weatherai-api-key")) || DEFAULT_API_KEY;

const BASE = "https://api.openweathermap.org/data/2.5";

export const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
});

export const fetchCurrentWeather = async (city: string) => {
  const { data } = await api.get("/weather", {
    params: { q: city, units: "metric", appid: getApiKey() },
  });
  return data;
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const { data } = await api.get("/weather", {
    params: { lat, lon, units: "metric", appid: getApiKey() },
  });
  return data;
};

export const fetchForecast = async (city: string) => {
  const { data } = await api.get("/forecast", {
    params: { q: city, units: "metric", appid: getApiKey() },
  });
  return data;
};

export const fetchForecastByCoords = async (lat: number, lon: number) => {
  const { data } = await api.get("/forecast", {
    params: { lat, lon, units: "metric", appid: getApiKey() },
  });
  return data;
};

// Generate deterministic mock fallback so UI is always functional
export const generateMockWeather = (city = "San Francisco") => {
  const base = Math.round(15 + Math.sin(city.length) * 10);
  const conditions = [
    { main: "Clear", description: "clear sky", icon: "01d" },
    { main: "Clouds", description: "scattered clouds", icon: "03d" },
    { main: "Rain", description: "light rain", icon: "10d" },
    { main: "Thunderstorm", description: "thunderstorm", icon: "11d" },
  ];
  const cond = conditions[city.length % conditions.length];
  return {
    __mock: true,
    name: city,
    sys: { country: "US", sunrise: Math.floor(Date.now() / 1000) - 3600, sunset: Math.floor(Date.now() / 1000) + 3600 * 10 },
    coord: { lat: 37.77, lon: -122.41 },
    main: {
      temp: base,
      feels_like: base - 2,
      temp_min: base - 3,
      temp_max: base + 3,
      humidity: 60 + (city.length % 20),
      pressure: 1012 + (city.length % 10),
    },
    weather: [cond],
    wind: { speed: 3 + (city.length % 5), deg: 210 },
    visibility: 10000,
    dt: Math.floor(Date.now() / 1000),
  };
};

export const generateMockForecast = (city = "San Francisco") => {
  const base = 15 + (city.length % 10);
  const conditions = [
    { main: "Clear", description: "clear sky", icon: "01d" },
    { main: "Clouds", description: "partly cloudy", icon: "02d" },
    { main: "Rain", description: "light rain", icon: "10d" },
    { main: "Clear", description: "sunny", icon: "01d" },
  ];
  const list: any[] = [];
  const now = Date.now();
  for (let i = 0; i < 40; i++) {
    const t = new Date(now + i * 3 * 3600 * 1000);
    list.push({
      dt: Math.floor(t.getTime() / 1000),
      dt_txt: t.toISOString().slice(0, 19).replace("T", " "),
      main: {
        temp: base + Math.sin(i / 2) * 6,
        feels_like: base + Math.sin(i / 2) * 5,
        humidity: 55 + Math.round(Math.cos(i / 3) * 20),
        pressure: 1012 + Math.round(Math.sin(i / 4) * 8),
      },
      wind: { speed: 3 + Math.abs(Math.sin(i / 2) * 5) },
      weather: [conditions[i % conditions.length]],
    });
  }
  return { __mock: true, list, city: { name: city, country: "US", coord: { lat: 37.77, lon: -122.41 } } };
};

export const iconUrl = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon || "01d"}@2x.png`;
