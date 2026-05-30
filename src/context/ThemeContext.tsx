// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// type Theme = "dark" | "light";
// interface ThemeCtx {
//   theme: Theme;
//   toggleTheme: () => void;
//   setTheme: (t: Theme) => void;
// }

// const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

// export function ThemeProvider({ children }: { children: ReactNode }) {
//   const [theme, setThemeState] = useState<Theme>(() => {
//     if (typeof window === "undefined") return "dark";
//     const saved = localStorage.getItem("weatherai-theme") as Theme | null;
//     if (saved) return saved;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     if (theme === "dark") {
//       root.classList.add("dark");
//       root.style.colorScheme = "dark";
//     } else {
//       root.classList.remove("dark");
//       root.style.colorScheme = "light";
//     }
//     localStorage.setItem("weatherai-theme", theme);
//   }, [theme]);

//   const toggleTheme = () =>
//     setThemeState((t) => (t === "dark" ? "light" : "dark"));
//   const setTheme = (t: Theme) => setThemeState(t);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
//   return ctx;
// }







import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";

    const saved = localStorage.getItem("weatherai-theme") as Theme | null;

    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    localStorage.setItem("weatherai-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setThemeState((t) => (t === "dark" ? "light" : "dark"));

  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}