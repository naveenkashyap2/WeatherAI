import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import { getAlert } from "../../utils/weatherHelpers";

export default function WeatherAlerts({ weather }: { weather: any }) {
  const [visible, setVisible] = useState(false);
  const alert = getAlert(weather);

  useEffect(() => {
    setVisible(!!alert);
  }, [alert?.message]);

  if (!alert) return null;

  const colors = {
    info: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-cyan-400/40",
    warn: "from-amber-500/20 via-orange-500/20 to-red-500/20 border-amber-400/40",
    danger: "from-red-500/30 via-rose-500/30 to-pink-500/30 border-red-400/50",
  }[alert.level];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4`}
        >
          <div className={`rounded-2xl bg-gradient-to-r ${colors} border backdrop-blur-xl px-5 py-4 flex items-center justify-between gap-4`}>
            <p className="text-sm font-medium text-white">{alert.message}</p>
            <button onClick={() => setVisible(false)} className="text-white/80 hover:text-white shrink-0">
              <HiOutlineX />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
