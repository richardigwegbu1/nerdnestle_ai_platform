/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{css,scss}",   // ensures globals.css is scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

