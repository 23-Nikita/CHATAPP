/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // if you have index.html
    "./src/**/*.{js,jsx,ts,tsx}" // include JSX/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
