// import { Link } from "react-router-dom";
// import {
//   BsCloudLightningFill,
//   BsGithub,
//   BsInstagram,
//   BsLinkedin,
// } from "react-icons/bs";
// import { useTheme } from "../../context/ThemeContext";

// export default function Footer() {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";
//   return (
//     <footer
//       className={`mt-20 border-t ${isDark ? "bg-slate-950/80 border-white/10 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"}`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-4 gap-8">
//           <div className="md:col-span-2">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
//                 <BsCloudLightningFill className="text-white text-lg" />
//               </div>
//               <span
//                 className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}
//               >
//                 Weather<span className="gradient-text">AI</span>
//               </span>
//             </div>
//             <p className="max-w-sm text-sm leading-relaxed">
//               AI-Powered Weather Intelligence combining real-time forecasts,
//               analytics, and smart insights — built with modern web technology.
//             </p>
//             <div className="flex gap-3 mt-4">
//               {[BsGithub, BsInstagram, BsLinkedin].map((Icon, i) => (
//                 <a
//                   key={i}
//                   href="https://github.com/naveenkashyap2"
//                   className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
//                     isDark
//                       ? "bg-white/5 hover:bg-white/10 hover:text-cyan-300"
//                       : "bg-slate-200 hover:bg-slate-300 hover:text-indigo-600"
//                   }`}
//                 >
//                   <Icon className="text-base" />
//                 </a>
//               ))}
//             </div>
//           </div>
//           <div>
//             <h4
//               className={`font-semibold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
//             >
//               Explore
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link to="/" className="hover:text-cyan-400 transition-colors">
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/https://www.linkedin.com/in/naveen-kashyap08/"
//                   className="hover:text-cyan-400 transition-colors"
//                 >
//                   Forecast
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/compare"
//                   className="hover:text-cyan-400 transition-colors"
//                 >
//                   Compare
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/favorites"
//                   className="hover:text-cyan-400 transition-colors"
//                 >
//                   Favorites
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4
//               className={`font-semibold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
//             >
//               Company
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   to="/about"
//                   className="hover:text-cyan-400 transition-colors"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-cyan-400 transition-colors">
//                   Privacy
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-cyan-400 transition-colors">
//                   Terms
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="hover:text-cyan-400 transition-colors">
//                   Contact
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div
//           className={`mt-10 pt-6 border-t text-center text-xs ${isDark ? "border-white/10" : "border-slate-200"}`}
//         >
//           © {new Date().getFullYear()} WeatherAI. Built with ❤️ using React,
//           Vite & Tailwind CSS. Powered by OpenWeather.
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
import {
  BsCloudLightningFill,
  BsGithub,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const socialLinks = [
    {
      icon: BsGithub,
      url: "https://github.com/naveenkashyap2",
    },
    {
      icon: BsInstagram,
      url: "https://instagram.com/naveenkashyap2130",
    },
    {
      icon: BsLinkedin,
      url: "https://www.linkedin.com/in/naveen-kashyap08/",
    },
  ];

  return (
    <footer
      className={`mt-20 border-t ${
        isDark
          ? "bg-slate-950/80 border-white/10 text-slate-400"
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <BsCloudLightningFill className="text-white text-lg" />
              </div>
              <span
                className={`font-display font-bold text-lg ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Weather<span className="gradient-text">AI</span>
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed">
              AI-Powered Weather Intelligence combining real-time forecasts,
              analytics, and smart insights — built with modern web technology.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                      isDark
                        ? "bg-white/5 hover:bg-white/10 hover:text-cyan-300"
                        : "bg-slate-200 hover:bg-slate-300 hover:text-indigo-600"
                    }`}
                  >
                    <Icon className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Explore
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/forecast"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Forecast
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className={`font-semibold mb-3 ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Company
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-cyan-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-10 pt-6 border-t text-center text-xs ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          © {new Date().getFullYear()} WeatherAI. Built with ❤️ using React,
          Vite & Tailwind CSS. Powered by OpenWeather.
        </div>
      </div>
    </footer>
  );
}