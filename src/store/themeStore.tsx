/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (newTheme: Theme) => void;
}

/** Apply the theme class to the document root */
const applyThemeClass = (theme: Theme) => {
  if (typeof window === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
};

/** localStorage adapter for Zustand persist (TS-safe) */
const localStorageAdapter = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

// Core store
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => {
          const newTheme: Theme = state.theme === "light" ? "dark" : "light";
          applyThemeClass(newTheme);
          return { theme: newTheme };
        }),
      setTheme: (newTheme) => {
        set({ theme: newTheme });
        applyThemeClass(newTheme);
      },
    }),
    {
      name: "theme-storage",
      storage: localStorageAdapter,
      onRehydrateStorage: () => (state) => {
        if (typeof window === "undefined") return;

        const initialTheme: Theme =
          state?.theme ??
          (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");

        applyThemeClass(initialTheme);
      },
    }
  )
);
