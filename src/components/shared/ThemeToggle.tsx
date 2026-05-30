import { motion } from "framer-motion";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className="relative w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-cyan-300 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <BsSun className="text-lg" />
        ) : (
          <BsMoonStars className="text-lg" />
        )}
      </motion.div>
    </motion.button>
  );
}
