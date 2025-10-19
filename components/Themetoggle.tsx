import React from "react";
import { useThemeStore } from "@/src/store/themeStore";
import { Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";

const Themetoggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <div>
      <Button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 ring-2 ring-ring/50 transition-all duration-300"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <Icon className="w-5 h-5 transition-all duration-300 transform rotate-0 scale-100" />
      </Button>
    </div>
  );
};

export default Themetoggle;
