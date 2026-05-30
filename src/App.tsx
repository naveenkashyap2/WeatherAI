import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen relative ${isDark ? "gradient-aurora" : "gradient-aurora-light"} ${isDark ? "text-white" : "text-slate-900"}`}
      >
        {/* Ambient background layer */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl animate-blob ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`}
          />
          <div
            className={`absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] rounded-full opacity-30 blur-3xl animate-blob ${isDark ? "bg-cyan-500" : "bg-cyan-300"}`}
            style={{ animationDelay: "3s" }}
          />
          <div
            className={`absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] rounded-full opacity-20 blur-3xl animate-blob ${isDark ? "bg-purple-700" : "bg-purple-300"}`}
            style={{ animationDelay: "6s" }}
          />
          {isDark && <div className="absolute inset-0 grid-bg opacity-20" />}
        </div>
        <Navbar />
        <main className="relative">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
