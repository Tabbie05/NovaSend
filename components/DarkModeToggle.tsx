"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E7E1D8] bg-white/95 text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white active:translate-y-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:shadow-[0_8px_20px_rgba(2,6,23,0.45)] dark:hover:border-emerald-500/40 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
