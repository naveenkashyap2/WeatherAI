import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsTrash, BsGeoAlt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  fetchCurrentWeather,
  generateMockWeather,
  iconUrl,
} from "../../services/weatherApi";
import { useTheme } from "../../context/ThemeContext";

export interface FavoriteCity {
  name: string;
  country?: string;
  addedAt: number;
}

export const getFavorites = (): FavoriteCity[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("weatherai-favorites") || "[]");
  } catch {
    return [];
  }
};
export const saveFavorites = (favs: FavoriteCity[]) =>
  localStorage.setItem("weatherai-favorites", JSON.stringify(favs));
export const isFavorite = (city: string) =>
  getFavorites().some((f) => f.name.toLowerCase() === city.toLowerCase());

export default function FavoriteCities() {
  const [favs, setFavs] = useState<FavoriteCity[]>(getFavorites());
  const [data, setData] = useState<Record<string, any>>({});
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    favs.forEach(async (f) => {
      if (data[f.name]) return;
      try {
        const d = await fetchCurrentWeather(f.name);
        setData((p) => ({ ...p, [f.name]: d }));
      } catch {
        setData((p) => ({ ...p, [f.name]: generateMockWeather(f.name) }));
      }
    });
  }, [favs]);

  const remove = (name: string) => {
    const next = favs.filter((f) => f.name !== name);
    setFavs(next);
    saveFavorites(next);
  };

  return (
    <div className="space-y-4">
      {favs.length === 0 ? (
        <div
          className={`rounded-2xl p-12 text-center ${isDark ? "glass-dark" : "glass-light"}`}
        >
          <div className="text-5xl mb-4">⭐</div>
          <h3
            className={`font-display font-bold text-xl mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            No favorites yet
          </h3>
          <p className="text-slate-400 mb-6">
            Add your favorite cities from the dashboard for quick access.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:scale-105 transition-transform"
          >
            Browse Cities
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {favs.map((f) => {
              const w = data[f.name];
              return (
                <motion.div
                  key={f.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer ${isDark ? "glass-dark" : "glass-light"}`}
                  onClick={() =>
                    navigate(`/dashboard/${encodeURIComponent(f.name)}`)
                  }
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-full blur-2xl" />
                  <div className="relative flex items-start justify-between mb-3">
                    <div>
                      <div
                        className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
                      >
                        {f.name}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <BsGeoAlt /> {f.country || "—"}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(f.name);
                      }}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <BsTrash />
                    </button>
                  </div>
                  {w ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={iconUrl(w.weather?.[0]?.icon)}
                        className="w-14 h-14"
                        alt=""
                      />
                      <div>
                        <div
                          className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}
                        >
                          {Math.round(w.main?.temp ?? 0)}°
                        </div>
                        <div className="text-xs text-slate-400 capitalize">
                          {w.weather?.[0]?.description}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="shimmer h-14 w-full rounded bg-white/10" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
