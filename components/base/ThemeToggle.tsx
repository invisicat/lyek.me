"use client";

import { Computer, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "system";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else if (mode === "light") {
    root.classList.remove("dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (mode === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [mode]);

  const setTheme = (nextMode: ThemeMode) => {
    setMode(nextMode);
    localStorage.setItem("theme", nextMode);
  };

  const baseClasses =
    "rounded p-1.5 text-[var(--text-tertiary)] transition-colors duration-200 hover:text-[var(--text)]";
  const activeClasses = "text-[var(--accent)]";

  return (
    <div className="mt-6 flex items-center gap-1">
      <button
        type="button"
        className={`${baseClasses} ${mode === "system" ? activeClasses : ""}`}
        title="System"
        aria-label="System theme"
        onClick={() => setTheme("system")}
      >
        <Computer size={16} />
      </button>
      <button
        type="button"
        className={`${baseClasses} ${mode === "light" ? activeClasses : ""}`}
        title="Light"
        aria-label="Light theme"
        onClick={() => setTheme("light")}
      >
        <Sun size={16} />
      </button>
      <button
        type="button"
        className={`${baseClasses} ${mode === "dark" ? activeClasses : ""}`}
        title="Dark"
        aria-label="Dark theme"
        onClick={() => setTheme("dark")}
      >
        <Moon size={16} />
      </button>
    </div>
  );
}
