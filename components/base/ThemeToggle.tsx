"use client";

import { useSyncExternalStore } from "react";

type ThemeMode = "light" | "dark" | "system";

const themeChangeEvent = "site-theme-change";
let unsavedMode: ThemeMode | undefined;

function readTheme(): ThemeMode {
  if (unsavedMode) return unsavedMode;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    // Keep the page usable when browser storage is unavailable.
  }
  return "light";
}

function applyTheme(mode: ThemeMode) {
  const isDark = mode === "dark" || (
    mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  document.documentElement.classList.toggle("dark", isDark);
}

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const syncTheme = () => {
    applyTheme(readTheme());
    onChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme" || event.key === null) {
      unsavedMode = undefined;
      syncTheme();
    }
  };

  syncTheme();
  window.addEventListener(themeChangeEvent, syncTheme);
  window.addEventListener("storage", onStorage);
  mediaQuery.addEventListener("change", syncTheme);
  return () => {
    window.removeEventListener(themeChangeEvent, syncTheme);
    window.removeEventListener("storage", onStorage);
    mediaQuery.removeEventListener("change", syncTheme);
  };
}

function setTheme(mode: ThemeMode) {
  unsavedMode = mode;
  try {
    localStorage.setItem("theme", mode);
    unsavedMode = undefined;
  } catch {
    // Apply the choice for this visit even if it cannot be saved.
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

export default function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, readTheme, () => "light");

  return (
    <label className="inline-flex min-h-6 items-center gap-1">
      <span>Theme</span>
      <select
        value={mode}
        onChange={(event) => setTheme(event.target.value as ThemeMode)}
        className="min-h-6 cursor-pointer rounded-none border-0 bg-[var(--bg)] py-1 pr-1 text-[var(--text-tertiary)]"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
