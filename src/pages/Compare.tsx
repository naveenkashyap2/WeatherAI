import CompareWeather from "../components/comparison/CompareWeather";
import { useTheme } from "../context/ThemeContext";

export default function Compare() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-cyan-400 mb-1">
          Compare
        </div>
        <h1
          className={`font-display font-bold text-3xl md:text-4xl ${isDark ? "text-white" : "text-slate-900"}`}
        >
          ⚖ Weather Comparison
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Compare up to 3 cities side-by-side.
        </p>
      </div>
      <CompareWeather />
    </div>
  );
}
