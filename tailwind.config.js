/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Outfit", "sans-serif"],
        text: ["Courgette", "sans-serif"],
      },
      colors: {
        grey: {
          200: "#C2C2C2",
        },
        opacitygrey: {
          500: "#DDDDDD",
        },
      },
    },
  },
  plugins: [],
};
