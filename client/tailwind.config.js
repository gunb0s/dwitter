/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        joans: ["Joan", "sans-serif"],
        dancingScripts: ["DancingScript", "sans-serif"],
      },
    },
  },
  plugins: [],
};
