"use client";

import { useEffect } from "react";
import { useTheme } from "@/src/store/themeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, colors } = useTheme();

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;

    // Add light/dark class
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Inject all theme colors as CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`${key}`, value);
    });
  }, [theme, colors]);

  return <>{children}</>;
}
