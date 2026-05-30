import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Loader from "../components/shared/Loader";

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Forecast = lazy(() => import("../pages/Forecast"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Compare = lazy(() => import("../pages/Compare"));
const About = lazy(() => import("../pages/About"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <Loader />
          </div>
        }
      >
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:city" element={<Dashboard />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/forecast/:city" element={<Forecast />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </Suspense>
    </AnimatePresence>
  );
}
