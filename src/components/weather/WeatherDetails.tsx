import { motion } from "framer-motion";
import {
  BsDropletHalf,
  BsWind,
  BsSpeedometer2,
  BsEye,
  BsThermometer,
  BsGeoAlt,
} from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

export default function WeatherDetails({ weather }: { weather: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  if (!weather) return null;

  const items = [
    {
      icon: BsThermometer,
      label: "Temperature",
      value: `${Math.round(weather.main.temp)}°C`,
      sub: `Min ${Math.round(weather.main.temp_min)}° / Max ${Math.round(weather.main.temp_max)}°`,
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: BsDropletHalf,
      label: "Humidity",
      value: `${weather.main.humidity}%`,
      sub: weather.main.humidity > 70 ? "High" : "Comfortable",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: BsWind,
      label: "Wind",
      value: `${weather.wind.speed} m/s`,
      sub: `Direction ${weather.wind.deg}°`,
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: BsSpeedometer2,
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
      sub: "Sea level",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: BsEye,
      label: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      sub: weather.visibility > 5000 ? "Clear" : "Low",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BsGeoAlt,
      label: "Coordinates",
      value: `${weather.coord.lat.toFixed(2)}°, ${weather.coord.lon.toFixed(2)}°`,
      sub: "Lat / Lon",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className={`relative overflow-hidden rounded-2xl p-5 ${isDark ? "glass-dark" : "glass-light"}`}
        >
          <div
            className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br ${it.gradient} opacity-20 blur-2xl`}
          />
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${it.gradient} flex items-center justify-center mb-3`}
          >
            <it.icon className="text-white text-lg" />
          </div>
          <div
            className={`text-xs uppercase tracking-wider mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            {it.label}
          </div>
          <div
            className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {it.value}
          </div>
          <div className="text-xs text-slate-400">{it.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}
