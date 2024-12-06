/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Include Flowbite React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin") // Correct plugin import
  ],
};
