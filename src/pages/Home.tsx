import Hero from "../components/home/Hero";
import AICards from "../components/home/AICards";
import FeatureCards from "../components/home/FeatureCards";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BsArrowRight,
  BsCloudLightningFill,
  BsShieldCheck,
  BsLightning,
} from "react-icons/bs";

export default function Home() {
  return (
    <div>
      <Hero />
      <AICards />
      <FeatureCards />

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-indigo-700 to-purple-800 p-10 md:p-16 text-center shadow-2xl"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-400/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to explore the{" "}
                <span className="text-cyan-200">skies</span>?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-base md:text-lg">
                Join thousands of users who trust WeatherAI for their daily
                weather intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold hover:scale-105 transition-transform shadow-xl"
                >
                  Open Dashboard <BsArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-semibold hover:scale-105 transition-transform"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { icon: BsCloudLightningFill, label: "Real-time" },
                  { icon: BsShieldCheck, label: "Reliable" },
                  { icon: BsLightning, label: "Lightning-fast" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 text-white/90"
                  >
                    <f.icon className="text-2xl text-cyan-300" />
                    <div className="text-xs font-medium uppercase tracking-wider">
                      {f.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
