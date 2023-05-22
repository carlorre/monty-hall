/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        latinCondensed: ["LatinCondensed", "sans-serif"],
      },
      colors: {
        montyOrange: "#f3a428",
        montyBlue: "#05142b",
      },
    },
  },
  plugins: [],
};
