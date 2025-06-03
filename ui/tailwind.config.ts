import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mode = "dark"'], // ✅ still valid in Tailwind v4,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [],
};

export default config;
