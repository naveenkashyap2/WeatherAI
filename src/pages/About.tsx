import { motion } from "framer-motion";
import {
  BsCloudLightningFill,
  BsShieldCheck,
  BsLightning,
  BsGraphUp,
  BsGlobe,
  BsPeopleFill,
} from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 items-center justify-center mb-6 shadow-2xl shadow-indigo-500/30">
          <BsCloudLightningFill className="text-white text-3xl" />
        </div>
        <div className="text-xs uppercase tracking-widest text-cyan-400 mb-2">
          About
        </div>
        <h1
          className={`font-display font-bold text-4xl md:text-5xl mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          About <span className="gradient-text">WeatherAI</span>
        </h1>
        <p
          className={`text-lg max-w-2xl mx-auto ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          A modern AI-powered weather platform combining real-time data,
          beautiful design, and intelligent insights — built for people who care
          about the skies.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: BsGlobe,
            title: "Global Coverage",
            desc: "Real-time weather for over 200,000 cities worldwide via OpenWeather.",
          },
          {
            icon: BsLightning,
            title: "AI Insights",
            desc: "Smart, contextual recommendations based on current conditions.",
          },
          {
            icon: BsGraphUp,
            title: "Rich Analytics",
            desc: "Interactive charts for temperature, humidity, and wind trends.",
          },
          {
            icon: BsShieldCheck,
            title: "Privacy First",
            desc: "Your favorites and preferences stay on your device.",
          },
          {
            icon: BsPeopleFill,
            title: "Built for Everyone",
            desc: "Mobile-first, accessible, and beautifully responsive.",
          },
          {
            icon: BsCloudLightningFill,
            title: "Modern Stack",
            desc: "Crafted with React, Vite, Tailwind, Recharts, and Framer Motion.",
          },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl p-6 ${isDark ? "glass-dark" : "glass-light"}`}
          >
            <f.icon className="text-3xl text-cyan-400 mb-3" />
            <h3
              className={`font-display font-semibold text-lg mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {f.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`rounded-3xl p-8 md:p-12 ${isDark ? "glass-dark" : "glass-light"}`}
      >
        <h2
          className={`font-display font-bold text-2xl mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Our Mission
        </h2>
        <p
          className={`leading-relaxed mb-4 ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          WeatherAI was built to reimagine what a weather app can be — moving
          beyond simple forecasts into a truly intelligent, beautiful, and
          human-centered experience.
        </p>
        <p
          className={`leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          Whether you're planning a commute, a weekend getaway, or just curious
          about another city — WeatherAI delivers the right information, at the
          right moment, in the most delightful way.
        </p>
      </motion.div>

      <div className="mt-12 text-center text-sm text-slate-400">
        Built with ❤️ using React · Vite · Tailwind CSS · Recharts · Framer
        Motion · OpenWeather API
      </div>
    </div>
  );
}
