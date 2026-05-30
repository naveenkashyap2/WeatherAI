import { motion } from "framer-motion";

export default function Loader({ size = 48 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-indigo-500"
          style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.8))" }}
        />
      </motion.div>
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="shimmer h-6 w-2/3 rounded mb-4 bg-white/10" />
      <div className="shimmer h-4 w-1/2 rounded mb-2 bg-white/10" />
      <div className="shimmer h-24 w-full rounded bg-white/10" />
    </div>
  );
}
