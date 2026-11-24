"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rb_theme") as Theme | null;
    const initial: Theme = saved === "light" || saved === "dark" ? saved : "dark";
    setThemeState(initial);
    applyThemeClass(initial);
    setMounted(true);
  }, []);

  const applyThemeClass = (t: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (t === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
    }
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    localStorage.setItem("rb_theme", next);
    applyThemeClass(next);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("rb_theme_changed", { detail: next }));
    }
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("rb_theme", t);
    applyThemeClass(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={mounted ? "contents" : "opacity-0 transition-opacity duration-150"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
