"use client";

import { useTheme } from "@/src/store/themeStore";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme , colors} = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => {
        toggleTheme();
      }}
      className="p-3 rounded-full
                 
                 transition-all duration-300 transform active:scale-95 focus:outline-none"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{backgroundColor: colors.gray2}}
    >
      {isDark ? (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      )}
    </button>
  );
}
