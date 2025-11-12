/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1919e6",
          dark: "#1414b8",
        },
        accent: {
          DEFAULT: "#FFC72C",
          hover: "#ffb900",
        },
        background: {
          light: "#ffffff",
          dark: "#111121",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
