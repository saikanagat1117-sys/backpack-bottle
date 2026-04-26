import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#1F3A2E",
        "forest-dark": "#142620",
        cream: "#F5EFE6",
        "cream-dark": "#E8DFD1",
        burnt: "#D97642",
        "burnt-dark": "#B85E30",
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
