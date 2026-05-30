import { useState } from "react";
import { motion } from "framer-motion";
import {
  BsPlus,
  BsTrash,
  BsDropletFill,
  BsWind,
  BsSpeedometer,
  BsThermometer,
} from "react-icons/bs";
import {
  fetchCurrentWeather,
  generateMockWeather,
  iconUrl,
} from "../../services/weatherApi";
import { useTheme } from "../../context/ThemeContext";

export default function CompareWeather() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [cities, setCities] = useState<{ name: string; input: string }[]>([
    { name: "", input: "" },
    { name: "", input: "" },
    { name: "", input: "" },
  ]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const update = (i: number, value: string) =>
    setCities((p) =>
      p.map((c, idx) => (idx === i ? { ...c, input: value } : c)),
    );

  const load = async (i: number) => {
    const city = cities[i].input.trim();
    if (!city) return;
    setLoading(true);
    try {
      let d;
      try {
        d = await fetchCurrentWeather(city);
      } catch {
        d = generateMockWeather(city);
      }
      setCities((p) =>
        p.map((c, idx) => (idx === i ? { ...c, name: d.name } : c)),
      );
      setData((prev) => {
        const next = [...prev];
        next[i] = d;
        return next;
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = (i: number) => {
    setCities((p) =>
      p.map((c, idx) => (idx === i ? { name: "", input: "" } : c)),
    );
    setData((p) => p.filter((_, idx) => idx !== i));
  };

  const metrics = [
    {
      key: "temp",
      label: "Temperature",
      icon: BsThermometer,
      value: (w: any) => `${Math.round(w.main.temp)}°C`,
      color: "text-orange-400",
    },
    {
      key: "humidity",
      label: "Humidity",
      icon: BsDropletFill,
      value: (w: any) => `${w.main.humidity}%`,
      color: "text-cyan-400",
    },
    {
      key: "wind",
      label: "Wind Speed",
      icon: BsWind,
      value: (w: any) => `${w.wind.speed} m/s`,
      color: "text-teal-400",
    },
    {
      key: "pressure",
      label: "Pressure",
      icon: BsSpeedometer,
      value: (w: any) => `${w.main.pressure} hPa`,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {cities.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-5 ${isDark ? "glass-dark" : "glass-light"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
              >
                City {String.fromCharCode(65 + i)}
              </div>
              {data[i] && (
                <button
                  onClick={() => clear(i)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <BsTrash />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <input
                value={c.input}
                onChange={(e) => update(i, e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && load(i)}
                placeholder="e.g. Tokyo"
                className={`flex-1 px-3 py-2 rounded-lg text-sm outline-none ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-white"
                    : "bg-slate-100 border border-slate-200 text-slate-900"
                }`}
              />
              <button
                onClick={() => load(i)}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-medium hover:scale-105 transition-transform"
              >
                <BsPlus />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {loading && (
        <div className="text-center text-slate-400 text-sm">
          Loading weather data...
        </div>
      )}

      {data.filter(Boolean).length > 0 && (
        <div
          className={`rounded-3xl overflow-hidden ${isDark ? "glass-dark" : "glass-light"}`}
        >
          <div className="grid md:grid-cols-3 divide-x divide-white/10">
            {data.map((w, i) => (
              <div key={i} className="p-6">
                {w ? (
                  <div className="text-center">
                    <img
                      src={iconUrl(w.weather[0].icon)}
                      className="w-20 h-20 mx-auto"
                      alt=""
                    />
                    <div
                      className={`font-display font-bold text-2xl mb-1 ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {w.name}
                    </div>
                    <div className="text-xs text-slate-400 uppercase mb-4">
                      {w.weather[0].description}
                    </div>
                    <div className={`text-5xl font-bold mb-6 gradient-text`}>
                      {Math.round(w.main.temp)}°
                    </div>
                    <div className="space-y-3 text-left">
                      {metrics.map((m) => (
                        <div
                          key={m.key}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <m.icon className={m.color} />
                            {m.label}
                          </div>
                          <div
                            className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
                          >
                            {m.value(w)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    Search a city to compare
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
