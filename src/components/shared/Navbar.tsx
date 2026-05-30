import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BsCloudLightningFill } from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/forecast", label: "Forecast" },
  { to: "/favorites", label: "Favorites" },
  { to: "/compare", label: "Compare" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      navigate(`/dashboard/${encodeURIComponent(q.trim())}`);
      setQ("");
      setOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? "bg-slate-950/60 border-white/10" : "bg-white/70 border-slate-200"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <BsCloudLightningFill className="text-white text-lg" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 opacity-30 blur-md -z-10" />
            </div>
            <span
              className={`font-display font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Weather<span className="gradient-text">AI</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-400"
                      : isDark
                        ? "text-slate-300 hover:text-white hover:bg-white/5"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={search} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search city..."
                  className={`w-48 lg:w-56 pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-all ${
                    isDark
                      ? "bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-400/50"
                      : "bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400"
                  }`}
                />
                <svg
                  className={`absolute left-3 top-2.5 w-4 h-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </form>
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              className={`lg:hidden p-2 rounded-lg ${isDark ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"}`}
              aria-label="Menu"
            >
              {open ? (
                <HiOutlineX className="text-xl" />
              ) : (
                <HiOutlineMenuAlt3 className="text-xl" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                <form onSubmit={search} className="mb-3">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search city..."
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none ${
                      isDark
                        ? "bg-white/5 border border-white/10 text-white"
                        : "bg-slate-100 border border-slate-200"
                    }`}
                  />
                </form>
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg text-sm font-medium ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-400"
                          : isDark
                            ? "text-slate-300 hover:bg-white/5"
                            : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
