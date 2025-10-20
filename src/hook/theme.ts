import { ThemeColors } from "../types/theme";

export const lightColors: ThemeColors = {
    background: "#FFFFFF",
    card: "#F5F5F5",
    text1: "#121212",
    text2: "#4B4B4B",
    text3: "#7D7D7D",
    primary: "#007AFF",
    secondary: "#34C759",
    red1: "#FF3B30",
    red2: "#FF6B6B",
    blue1: "#0A84FF",
    blue2: "#5AC8FA",
    green1: "#34C759",
    green2: "#4CD964",
    yellow1: "#FFD60A",
    yellow2: "#FFE066",
    pink1: "#FF2D55",
    pink2: "#FF5E8D",
    coral1: "#FF6B61",
    coral2: "#FF8C80",
};

export const darkColors: ThemeColors = {
    background: "#121212",
    card: "#2C2C2C",
    text1: "#FFFFFF",
    text2: "#D1D1D1",
    text3: "#9E9E9E",
    primary: "#0A84FF",
    secondary: "#30D158",
    red1: "#FF453A",
    red2: "#FF6F61",
    blue1: "#0A84FF",
    blue2: "#64B5F6",
    green1: "#30D158",
    green2: "#5CD685",
    yellow1: "#FFD60A",
    yellow2: "#FFE066",
    pink1: "#FF375F",
    pink2: "#FF7F9C",
    coral1: "#FF6B61",
    coral2: "#FF8C80",
};

// Helper
export const getThemeColors = (themeName: "light" | "dark"): ThemeColors =>
    themeName === "dark" ? darkColors : lightColors;
