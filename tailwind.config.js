/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        light: "#FCFCFC",
        dark: "#141414",
        opacity: "rgba(48, 48, 48, 0.80)",
        lightblue: "#04b290",
        green: "#bbff15",
        pink: "#e206f4",
        orange: "#f9700b",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        accent: ["Prompt", "sans-serif"],
      },
      screens: {
        xsm: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1700px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
