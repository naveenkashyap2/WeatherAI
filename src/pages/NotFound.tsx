import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsHouseFill, BsArrowLeft } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

export default function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full rounded-3xl p-10 text-center ${isDark ? "glass-dark" : "glass-light"}`}
      >
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-5xl">🌪️</span>
          </div>
        </div>
        <div className="font-display font-bold text-7xl gradient-text mb-2">
          404
        </div>
        <h1
          className={`font-display font-bold text-2xl mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Page Lost in the Storm
        </h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for drifted away. Let's guide you back to
          clearer skies.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform"
          >
            <BsHouseFill /> Back Home
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass font-semibold hover:scale-105 transition-transform"
          >
            <BsArrowLeft /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
