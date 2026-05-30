import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import CurrentWeather from "../components/weather/CurrentWeather";
import HourlyForecast from "../components/weather/HourlyForecast";
import WeatherDetails from "../components/weather/WeatherDetails";
import AIInsight from "../components/weather/AIInsight";
import WeatherAlerts from "../components/alerts/WeatherAlerts";
import TemperatureChart from "../components/analytics/TemperatureChart";
import HumidityChart from "../components/analytics/HumidityChart";
import WindChart from "../components/analytics/WindChart";
import Loader, { SkeletonCard } from "../components/shared/Loader";
import {
  getFavorites,
  saveFavorites,
  isFavorite,
} from "../components/favorites/FavoriteCities";
import {
  BsArrowClockwise,
  BsGeoAltFill,
  BsGraphUp,
  BsLightning,
  BsDropletFill,
  BsWind,
} from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const geo = useGeolocation();
  const [favState, setFavState] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const coords =
    lat && lon
      ? { lat: +lat, lon: +lon }
      : geo.latitude && geo.longitude
        ? { lat: geo.latitude, lon: geo.longitude }
        : null;
  const effectiveCity = city || (coords ? undefined : "London");

  const { current, forecast, loading, reload } = useWeather(
    effectiveCity,
    city ? null : coords,
  );
  const [favs, setFavs] = useState(isFavorite(current?.name || ""));

  useEffect(() => {
    setFavs(isFavorite(current?.name || ""));
  }, [current?.name, favState]);

  const toggleFav = () => {
    if (!current?.name) return;
    const existing = getFavorites();
    const next = existing.some(
      (f) => f.name.toLowerCase() === current.name.toLowerCase(),
    )
      ? existing.filter(
          (f) => f.name.toLowerCase() !== current.name.toLowerCase(),
        )
      : [
          ...existing,
          {
            name: current.name,
            country: current.sys?.country,
            addedAt: Date.now(),
          },
        ];
    saveFavorites(next);
    setFavState((n) => n + 1);
  };

  const useGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        window.location.href = `/dashboard?lat=${p.coords.latitude}&lon=${p.coords.longitude}`;
      });
    }
  };

  const stats = current
    ? [
        {
          label: "Temperature",
          value: `${Math.round(current.main.temp)}°`,
          icon: BsLightning,
          gradient: "from-orange-500 to-red-500",
        },
        {
          label: "Humidity",
          value: `${current.main.humidity}%`,
          icon: BsDropletFill,
          gradient: "from-cyan-500 to-blue-500",
        },
        {
          label: "Wind",
          value: `${current.wind.speed} m/s`,
          icon: BsWind,
          gradient: "from-teal-500 to-emerald-500",
        },
        {
          label: "Forecast Days",
          value: "5",
          icon: BsGraphUp,
          gradient: "from-purple-500 to-indigo-500",
        },
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <WeatherAlerts weather={current} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-cyan-400 mb-1">
            Dashboard
          </div>
          <h1
            className={`font-display font-bold text-3xl md:text-4xl ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {current
              ? `${current.name} Weather`
              : loading
                ? "Loading..."
                : "Weather Dashboard"}
          </h1>
          {coords && !city && (
            <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
              <BsGeoAltFill className="text-cyan-400" />
              Using your location: {coords.lat.toFixed(2)},{" "}
              {coords.lon.toFixed(2)}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={useGeo}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium hover:scale-105 transition-transform"
          >
            <BsGeoAltFill className="text-cyan-400" />
            My Location
          </button>
          <button
            onClick={reload}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-medium hover:scale-105 transition-transform"
          >
            <BsArrowClockwise /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-16">
            <Loader size={64} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      ) : current ? (
        <div className="space-y-6">
          <CurrentWeather
            weather={current}
            onToggleFavorite={toggleFav}
            isFavorite={favs}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "glass-dark" : "glass-light"}`}
              >
                <div
                  className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${s.gradient} opacity-30 blur-2xl`}
                />
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3`}
                >
                  <s.icon className="text-white" />
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400">
                  {s.label}
                </div>
                <div
                  className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  {s.value}
                </div>
              </motion.div>
            ))}
          </div>

          <AIInsight weather={current} />
          <HourlyForecast forecast={forecast} />

          <div className="grid lg:grid-cols-2 gap-6">
            <div
              className={`rounded-3xl p-6 ${isDark ? "glass-dark" : "glass-light"}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <BsLightning className="text-white text-sm" />
                </div>
                <h3
                  className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Temperature Trend
                </h3>
              </div>
              <TemperatureChart forecast={forecast} />
            </div>
            <div
              className={`rounded-3xl p-6 ${isDark ? "glass-dark" : "glass-light"}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <BsDropletFill className="text-white text-sm" />
                </div>
                <h3
                  className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Humidity Trend
                </h3>
              </div>
              <HumidityChart forecast={forecast} />
            </div>
            <div
              className={`rounded-3xl p-6 lg:col-span-2 ${isDark ? "glass-dark" : "glass-light"}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <BsWind className="text-white text-sm" />
                </div>
                <h3
                  className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
                >
                  Wind Speed Chart
                </h3>
              </div>
              <WindChart forecast={forecast} />
            </div>
          </div>

          <div>
            <h2
              className={`font-display font-bold text-2xl mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              📍 Detailed Conditions
            </h2>
            <WeatherDetails weather={current} />
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl p-12 text-center ${isDark ? "glass-dark" : "glass-light"}`}
        >
          <div className="text-5xl mb-4">🌐</div>
          <h3
            className={`font-display font-bold text-xl mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Search a city to begin
          </h3>
          <p className="text-slate-400">
            Use the search above or allow location access to see your weather.
          </p>
        </div>
      )}
    </div>
  );
}
