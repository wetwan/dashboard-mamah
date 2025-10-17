/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'
import { createThemes } from 'tw-colors'
import { object } from 'zod'

const baseColors = [
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink"
]

const shadeMapping = {
    "50": "900",
    "100": "800",
    "200": "700",
    "300": "600",
    "400": "500",
    "500": "400",
    "600": "300",
    "700": "200",
    "800": "100",
    "900": "50"
}

const generateThemeObject = (colorsObj: any, mapping: any, invert = false) => {
    const theme: any = {};

    baseColors.forEach((colorName) => {
        theme[colorName] = {};
        Object.entries(mapping).forEach(([key, value]: any) => {
            const shadeKey = invert ? value : key;
            theme[colorName][key] = colorsObj[colorName][shadeKey];
        });
    });

    return theme;
};


const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
    light: {
        ...lightTheme,
        white: '#fff',
    },
    dark: {
        ...darkTheme,
        white: colors.gray["950"],
        black: colors.gray["50"],
    },
};


const tailwindConfig = {
    darkMode: 'class',
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {

        },
    },
    plugins: [createThemes(themes)],
};

export default tailwindConfig;