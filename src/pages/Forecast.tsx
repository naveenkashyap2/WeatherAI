import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchForecast, generateMockForecast } from "../services/weatherApi";
import ForecastCard from "../components/weather/ForecastCard";
import HourlyForecast from "../components/weather/HourlyForecast";
import TemperatureChart from "../components/analytics/TemperatureChart";
import Loader from "../components/shared/Loader";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function Forecast() {
  const { city: paramCity } = useParams();
  const [city, setCity] = useState(paramCity || "London");
  const [input, setInput] = useState(paramCity || "London");
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const load = async (c: string) => {
    setLoading(true);
    try {
      let d;
      try {
        d = await fetchForecast(c);
      } catch {
        d = generateMockForecast(c);
      }
      setForecast(d);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(city);
  }, [city]);
  useEffect(() => {
    if (paramCity) {
      setCity(paramCity);
      setInput(paramCity);
    }
  }, [paramCity]);

  // Group forecast by day
  const daily: any[] = [];
  if (forecast?.list) {
    const groups: Record<string, any[]> = {};
    forecast.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    });
    Object.entries(groups)
      .slice(0, 5)
      .forEach(([, items]) => {
        const temps = items.map((i: any) => i.main.temp);
        daily.push({
          dt: items[0].dt,
          main: { temp_min: Math.min(...temps), temp_max: Math.max(...temps) },
          weather: [items[4]?.weather[0] || items[0].weather[0]],
        });
      });
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) setCity(input.trim());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-cyan-400 mb-1">
            Forecast
          </div>
          <h1
            className={`font-display font-bold text-3xl md:text-4xl ${isDark ? "text-white" : "text-slate-900"}`}
          >
            📅 5-Day Forecast
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Detailed hourly and daily predictions
          </p>
        </div>
        <form onSubmit={submit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city..."
            className={`px-4 py-2.5 rounded-xl text-sm outline-none ${
              isDark
                ? "bg-white/5 border border-white/10 text-white"
                : "bg-white border border-slate-200 text-slate-900"
            }`}
          />
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:scale-105 transition-transform">
            Go
          </button>
        </form>
      </div>

      {loading ? (
        <div className="py-16">
          <Loader size={64} />
        </div>
      ) : forecast ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div>
            <h2
              className={`font-display font-bold text-xl mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              🗓 Daily Forecast — {forecast.city?.name || city}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {daily.map((d, i) => (
                <ForecastCard key={i} day={d} />
              ))}
            </div>
          </div>

          <HourlyForecast forecast={forecast} />

          <div
            className={`rounded-3xl p-6 ${isDark ? "glass-dark" : "glass-light"}`}
          >
            <h3
              className={`font-display font-bold text-xl mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              📈 Temperature Forecast
            </h3>
            <TemperatureChart forecast={forecast} />
          </div>
        </motion.div>
      ) : (
        <div
          className={`rounded-2xl p-12 text-center ${isDark ? "glass-dark" : "glass-light"}`}
        >
          <p className="text-slate-400">Enter a city to view its forecast.</p>
        </div>
      )}
    </div>
  );
}
