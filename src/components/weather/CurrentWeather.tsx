import { motion } from "framer-motion";
import {
  BsStar,
  BsStarFill,
  BsDropletFill,
  BsWind,
  BsEye,
  BsSpeedometer,
  BsThermometerHalf,
  BsSunrise,
  BsSunset,
} from "react-icons/bs";
import { iconUrl } from "../../services/weatherApi";
import { formatTime } from "../../utils/formatDate";
import { useTheme } from "../../context/ThemeContext";

export default function CurrentWeather({
  weather,
  onToggleFavorite,
  isFavorite,
}: {
  weather: any;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  if (!weather) return null;

  const temp = Math.round(weather.main?.temp ?? 0);
  const feels = Math.round(weather.main?.feels_like ?? 0);
  const main = weather.weather?.[0]?.main || "Clear";
  const desc = weather.weather?.[0]?.description || "—";
  const icon = weather.weather?.[0]?.icon || "01d";

  const details = [
    {
      icon: BsDropletFill,
      label: "Humidity",
      value: `${weather.main?.humidity ?? 0}%`,
      color: "text-cyan-400",
    },
    {
      icon: BsWind,
      label: "Wind",
      value: `${weather.wind?.speed ?? 0} m/s`,
      color: "text-teal-400",
    },
    {
      icon: BsSpeedometer,
      label: "Pressure",
      value: `${weather.main?.pressure ?? 0} hPa`,
      color: "text-purple-400",
    },
    {
      icon: BsEye,
      label: "Visibility",
      value: `${((weather.visibility ?? 0) / 1000).toFixed(1)} km`,
      color: "text-blue-400",
    },
    {
      icon: BsThermometerHalf,
      label: "Feels Like",
      value: `${feels}°`,
      color: "text-orange-400",
    },
    {
      icon: BsSunrise,
      label: "Sunrise",
      value: formatTime(weather.sys?.sunrise ?? 0),
      color: "text-yellow-400",
    },
    {
      icon: BsSunset,
      label: "Sunset",
      value: formatTime(weather.sys?.sunset ?? 0),
      color: "text-rose-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-indigo-600 via-purple-700 to-cyan-600 shadow-2xl ${isDark ? "" : "shadow-indigo-200"}`}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />

      <div className="relative grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-5xl">{temp}°</div>
            <div className="text-slate-200 text-sm">Celsius</div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <img
              src={iconUrl(icon)}
              alt={main}
              className="w-20 h-20 drop-shadow-2xl"
            />
            <div>
              <div className="text-sm text-slate-200 uppercase tracking-wider">
                {desc}
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                {weather.name || "Unknown"},{" "}
                <span className="text-slate-200">{weather.sys?.country}</span>
              </div>
            </div>
          </div>

          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition-all text-white text-sm font-medium"
            >
              {isFavorite ? (
                <BsStarFill className="text-yellow-300" />
              ) : (
                <BsStar />
              )}
              {isFavorite ? "Saved to favorites" : "Add to favorites"}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {details.map((d) => (
            <div
              key={d.label}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-sm rounded-xl p-3 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <d.icon className={`${d.color} text-lg`} />
                <div className="text-xs text-slate-200 uppercase tracking-wider">
                  {d.label}
                </div>
              </div>
              <div className="text-xl font-bold text-white">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
