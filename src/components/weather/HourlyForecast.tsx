import { motion } from "framer-motion";
import { iconUrl } from "../../services/weatherApi";
import { formatHour } from "../../utils/formatDate";
import { useTheme } from "../../context/ThemeContext";

export default function HourlyForecast({ forecast }: { forecast: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  if (!forecast?.list) return null;
  const hours = forecast.list.slice(0, 8);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl p-6 ${isDark ? "glass-dark" : "glass-light"}`}
    >
      <h3
        className={`font-display font-bold text-xl mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
      >
        ⏱ Hourly Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hours.map((h: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`shrink-0 w-20 rounded-2xl p-3 text-center ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-white hover:bg-slate-50"} border ${isDark ? "border-white/10" : "border-slate-200"} transition-colors`}
          >
            <div className="text-xs font-medium text-slate-400">
              {i === 0 ? "Now" : formatHour(h.dt_txt)}
            </div>
            <img
              src={iconUrl(h.weather[0].icon)}
              alt=""
              className="w-12 h-12 mx-auto"
            />
            <div
              className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {Math.round(h.main.temp)}°
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
