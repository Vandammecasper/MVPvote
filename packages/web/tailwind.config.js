/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors:{
      primary: "#282828",
      secondary: "#FFFFFF",
      accent: "#28965A",
      red: "#D7263D",
      blue: "#00A7E1",
      black: "#000000",
    },
    fontFamily: {
      gill: ["Gill Sans MT", "sans-serif"],
    },
    extend: {
      height: {
        100: "30rem",
      }
    },
  },
  plugins: [],
}

