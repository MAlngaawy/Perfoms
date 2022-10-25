const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require(path.resolve(__dirname, "src/@main/tailwind/plugins/icon-size")),
  ],
};
