"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ThemeColors } from "../types/theme";
import { darkColors, lightColors } from "../hook/theme";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      colors: lightColors, // default colors
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          return {
            theme: newTheme,
            colors: newTheme === "light" ? lightColors : darkColors,
          };
        }),
      setTheme: (theme) =>
        set({ theme, colors: theme === "light" ? lightColors : darkColors }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
