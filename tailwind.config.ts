import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        darkbg: {
          950: "#030c08",
          900: "#06130d",
          800: "#0b1e15",
          700: "#132b20",
        },
        accent: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.15) 0%, rgba(6, 19, 13, 0) 70%)',
        'subtle-grid': 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
};
export default config;

