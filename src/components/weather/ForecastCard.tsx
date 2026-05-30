import { motion } from "framer-motion";
import { iconUrl } from "../../services/weatherApi";
import { formatDate } from "../../utils/formatDate";
import { useTheme } from "../../context/ThemeContext";

export default function ForecastCard({ day }: { day: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  if (!day) return null;
  const min = Math.round(day.main?.temp_min ?? 0);
  const max = Math.round(day.main?.temp_max ?? 0);
  const icon = day.weather?.[0]?.icon || "01d";
  const desc = day.weather?.[0]?.description || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`rounded-2xl p-4 text-center ${isDark ? "glass-dark hover:border-cyan-400/40" : "glass-light hover:border-indigo-300"}`}
    >
      <div
        className={`text-xs font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}
      >
        {formatDate(day.dt)}
      </div>
      <img src={iconUrl(icon)} alt={desc} className="w-14 h-14 mx-auto" />
      <div className="flex items-center justify-center gap-2">
        <span
          className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}
        >
          {max}°
        </span>
        <span className="text-sm text-slate-400">{min}°</span>
      </div>
      <div className="text-[11px] text-slate-400 capitalize mt-1">{desc}</div>
    </motion.div>
  );
}
