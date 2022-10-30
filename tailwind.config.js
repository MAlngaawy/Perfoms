const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        perfBlue: "#2F80ED",
        perfGray: "#8D8D8D",
        perfGray1: "#333333",
        perfGray2: "#4f4f4f",
        perfGray3: "#828282",
        perfOfWhite: "#f9fbfc00",
        perfSecondary: "#C32B43",
      },
      screens: {
        lg: "1200px",
      },
    },
  },
  plugins: [
    require(path.resolve(__dirname, "src/@main/tailwind/plugins/icon-size")),
  ],
};
