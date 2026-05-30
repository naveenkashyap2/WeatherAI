import { motion } from "framer-motion";

const ais = [
  {
    name: "ChatGPT",
    desc: "OpenAI",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glow: "glow-cyan",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
        <path d="M22.28 9.46a5.7 5.7 0 0 0-.47-4.74 5.84 5.84 0 0 0-7.06-2.63 5.7 5.7 0 0 0-4.31-1.9 5.84 5.84 0 0 0-5.65 4.55 5.7 5.7 0 0 0-3.8 2.78 5.84 5.84 0 0 0 .74 7.18 5.7 5.7 0 0 0 .47 4.74 5.84 5.84 0 0 0 7.06 2.63 5.7 5.7 0 0 0 4.31 1.9 5.84 5.84 0 0 0 5.65-4.55 5.7 5.7 0 0 0 3.8-2.78 5.84 5.84 0 0 0-.74-7.18zm-1.69 8.04a3.66 3.66 0 0 1-2.33 1.69l-.13.03.09-.1a7.65 7.65 0 0 0 1.17-4.06v-7.7l-5.94 3.42v6.83a3.7 3.7 0 0 1 4.22-.38l.11.07a3.66 3.66 0 0 1 1.8 2.17zM4.54 16.16a3.66 3.66 0 0 1-.44-2.74l.04-.13.09.1a7.64 7.64 0 0 0 3.5 2.95l5.95 3.42-5.94 3.41a3.7 3.7 0 0 1-1.61-4.01l.04-.11a3.66 3.66 0 0 1-1.63-2.89zM3.18 5.81A3.66 3.66 0 0 1 5.17 4.5l.13-.03-.09.1a7.65 7.65 0 0 0-1.17 4.06v7.7l-5.94-3.42v-6.83a3.7 3.7 0 0 1-4.22.38l-.11-.07a3.66 3.66 0 0 1 5.41-.58z" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    desc: "Google",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    glow: "glow-purple",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
        <path d="M12 2C12 7.58 7.58 12 2 12c5.58 0 10 4.42 10 10 0-5.58 4.42-10 10-10-5.58 0-10-4.42-10-10z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    desc: "Anthropic",
    gradient: "from-orange-400 via-rose-500 to-pink-600",
    glow: "glow-blue",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
        <circle cx="12" cy="12" r="9" />
        <path
          d="M9 12h6M12 9v6"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function AICards() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium tracking-widest text-cyan-300 mb-4">
            AI INSPIRED EXPERIENCE
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
            Built with the <span className="gradient-text">Best AI Minds</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            WeatherAI is inspired by leading AI models — bringing intelligent,
            conversational, and predictive weather experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ais.map((ai, i) => (
            <motion.div
              key={ai.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div
                className={`absolute -inset-1 bg-gradient-to-br ${ai.gradient} rounded-2xl opacity-30 blur-lg group-hover:opacity-60 transition-opacity`}
              />
              <div className="relative glass rounded-2xl p-6 text-center hover:border-white/30 transition-all">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${ai.gradient} flex items-center justify-center ${ai.glow}`}
                >
                  {ai.icon}
                </motion.div>
                <h3 className="font-display font-bold text-xl text-white mb-1">
                  {ai.name}
                </h3>
                <p className="text-sm text-slate-400">{ai.desc}</p>
                <div className="mt-4 flex items-center justify-center gap-1 text-xs text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
