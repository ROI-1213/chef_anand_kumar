import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#10100F",
          50: "#2A2A28",
          100: "#222220",
          200: "#1A1A18",
          300: "#141413",
          400: "#10100F",
          900: "#080807",
        },
        ivory: {
          DEFAULT: "#F6F1E8",
          light: "#FCFAF6",
          dark: "#E8DFCF",
          muted: "#DDD2BF",
        },
        gold: {
          DEFAULT: "#C8A76B",
          light: "#DFBF88",
          dark: "#A68449",
          muted: "rgba(200, 167, 107, 0.2)",
        },
        burgundy: {
          DEFAULT: "#552A2E",
          dark: "#3B1B1E",
          light: "#6E383D",
        },
        espresso: {
          DEFAULT: "#352720",
          dark: "#241A15",
          light: "#49372E",
        },
        sage: {
          DEFAULT: "#797F6A",
          dark: "#5E6450",
          light: "#959B86",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.25em",
        mega: "0.35em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
