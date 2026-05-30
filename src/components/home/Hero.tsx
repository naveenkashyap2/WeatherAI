import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsSearch, BsGeoAltFill, BsCloudSunFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";

export default function Hero() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) navigate(`/dashboard/${encodeURIComponent(city.trim())}`);
  };

  const useLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        navigate(
          `/dashboard?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
        ),
      () => navigate("/dashboard/London"),
    );
  };

  return (
    <section className="relative pt-10 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <HiSparkles className="text-cyan-300" />
              <span className="text-xs font-medium tracking-wide text-white/90">
                POWERED BY ARTIFICIAL INTELLIGENCE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-6"
            >
              AI-Powered
              <br />
              <span className="gradient-text text-glow">
                Weather Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 max-w-xl mb-8 leading-relaxed"
            >
              Real-time forecasts, analytics, and smart weather insights powered
              by modern technology — crafted for clarity and precision.
            </motion.p>

            <motion.form
              onSubmit={search}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <div className="relative flex-1">
                <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search any city — Tokyo, Paris, New York..."
                  className="w-full pl-11 pr-4 py-4 rounded-xl glass text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
              >
                Search <BsSearch className="text-sm" />
              </button>
            </motion.form>

            <motion.button
              onClick={useLocation}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-white/80 hover:text-cyan-300 hover:border-cyan-400/50 transition-all"
            >
              <BsGeoAltFill className="text-cyan-400" />
              Use my current location
            </motion.button>

            {/* Temp highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 grid grid-cols-3 gap-4 max-w-md"
            >
              {[
                { label: "Cities", value: "200K+" },
                { label: "Accuracy", value: "99%" },
                { label: "Updates", value: "Real-time" },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <div className="text-xl md:text-2xl font-bold gradient-text">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — animated illustration */}
          <div className="relative h-[420px] md:h-[520px] lg:h-[560px]">
            {/* Glowing sun */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-[15%] right-[10%] w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 glow-cyan"
              style={{ boxShadow: "0 0 120px rgba(251, 191, 36, 0.6)" }}
            />
            {/* Orbit ring */}
            <div className="absolute top-[10%] right-[5%] w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/10" />

            {/* Floating clouds */}
            {[
              {
                top: "8%",
                left: "10%",
                size: "w-28 h-16 md:w-36 md:h-20",
                delay: 0,
              },
              {
                top: "45%",
                left: "5%",
                size: "w-24 h-14 md:w-32 md:h-18",
                delay: 1,
              },
              {
                top: "70%",
                left: "40%",
                size: "w-32 h-18 md:w-40 md:h-22",
                delay: 2,
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: c.delay,
                }}
                className={`absolute ${c.size}`}
                style={{ top: c.top, left: c.left }}
              >
                <div className="w-full h-full bg-white/80 rounded-full blur-[1px] shadow-2xl relative">
                  <div className="absolute w-2/3 h-full bg-white rounded-full -top-3 left-4" />
                  <div className="absolute w-1/2 h-4/5 bg-white rounded-full -top-6 left-10" />
                </div>
              </motion.div>
            ))}

            {/* Main weather card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-[30%] left-[15%] w-60 glass rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">
                    Now
                  </div>
                  <div className="font-bold text-white">India</div>
                </div>
                <BsCloudSunFill className="text-3xl text-yellow-300" />
              </div>
              <div className="text-5xl font-bold text-white mb-1">22°</div>
              <div className="text-xs text-slate-400">Partly Cloudy</div>
            </motion.div>

            {/* Small floating stat cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-[15%] right-[10%] glass rounded-xl p-4 shadow-xl"
            >
              <div className="text-xs text-slate-400">Humidity</div>
              <div className="text-xl font-bold text-white">68%</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-[10%] left-[5%] glass rounded-xl p-4 shadow-xl"
            >
              <div className="text-xs text-slate-400">Wind</div>
              <div className="text-xl font-bold text-white">12 km/h</div>
            </motion.div>

            {/* Particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 2 + (i % 4),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300"
                style={{
                  top: `${10 + ((i * 7) % 80)}%`,
                  left: `${5 + ((i * 11) % 90)}%`,
                  boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
