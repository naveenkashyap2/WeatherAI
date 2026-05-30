import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BsCloudLightningFill,
  BsGraphUp,
  BsWind,
  BsStars,
  BsGeoAltFill,
  BsArrowLeftRight,
} from "react-icons/bs";

const features = [
  {
    icon: BsCloudLightningFill,
    title: "Live Weather",
    desc: "Real-time updates for any city worldwide with detailed conditions.",
    color: "from-cyan-500 to-blue-600",
    to: "/dashboard",
  },
  {
    icon: BsGraphUp,
    title: "Forecast Analytics",
    desc: "5-day & hourly forecasts visualized with interactive charts.",
    color: "from-indigo-500 to-purple-600",
    to: "/forecast",
  },
  {
    icon: BsWind,
    title: "Air Quality",
    desc: "Monitor humidity, pressure, visibility, and wind patterns.",
    color: "from-teal-500 to-emerald-600",
    to: "/dashboard",
  },
  {
    icon: BsStars,
    title: "Smart Insights",
    desc: "AI-generated weather advice tailored to current conditions.",
    color: "from-amber-500 to-pink-600",
    to: "/dashboard",
  },
  {
    icon: BsGeoAltFill,
    title: "Location Tracking",
    desc: "Instantly see the weather for your current location.",
    color: "from-rose-500 to-red-600",
    to: "/dashboard",
  },
  {
    icon: BsArrowLeftRight,
    title: "Weather Comparison",
    desc: "Compare up to 3 cities side-by-side with live metrics.",
    color: "from-fuchsia-500 to-violet-600",
    to: "/compare",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium tracking-widest text-indigo-300 mb-4">
            EVERYTHING YOU NEED
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
            Powerful <span className="gradient-text">Weather Features</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything a modern weather app should be — and more. Beautiful,
            fast, intelligent.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-br ${f.color} rounded-2xl opacity-0 group-hover:opacity-40 blur-md transition-opacity`}
              />
              <Link
                to={f.to}
                className="block relative glass rounded-2xl p-6 h-full hover:border-white/30 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <f.icon className="text-white text-2xl" />
                </div>
                <h3 className="font-display font-semibold text-xl text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-cyan-300 group-hover:gap-3 transition-all">
                  Explore <span>→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
