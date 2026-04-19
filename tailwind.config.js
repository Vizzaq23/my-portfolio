/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-pixel)", "cursive"],
      },
      colors: {
        ink: {
          DEFAULT: "#0f172a",
          muted: "#334155",
        },
        brand: {
          sky: "#0284c7",
          accent: "#facc15",
        },
      },
    },
  },
  plugins: [],
};
