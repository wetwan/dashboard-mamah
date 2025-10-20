export const lightColors = {
    // Backgrounds
    background: "#FFFFFF", // White
    card: "#F5F5F5",       // Light Gray for containers

    // Text
    text1: "#121212",      // Main text (dark gray / black)
    text2: "#4B4B4B",      // Secondary text
    text3: "#7D7D7D",      // Tertiary text / muted

    // Primary colors
    primary: "#007AFF",    // Main primary (blue)
    secondary: "#34C759",  // Secondary accent (green)
};

export const darkColors = {
    // Backgrounds
    background: "#121212", // Dark Gray / Black
    card: "#2C2C2C",       // Dark Gray for containers

    // Text
    text1: "#FFFFFF",      // Main text (white)
    text2: "#D1D1D1",      // Secondary text
    text3: "#9E9E9E",      // Tertiary text / muted

    // Primary colors
    primary: "#0A84FF",    // Main primary (lighter blue)
    secondary: "#30D158",  // Secondary accent (green)
    red:  ''
};

// A helper function to select the right set of colors
export const getThemeColors = (themeName: string) => {
    return themeName === 'dark' ? darkColors : lightColors;
};
