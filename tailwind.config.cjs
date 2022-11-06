const path = require("path");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
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
        perfLightBlack: "#45464E",
        green: "#27AE60",
        yellow: "#F2C94C",
        red: "#EB5757",
        fadedGreen: "#27ae5f36",
        fadedYellow: "#f2c84c2f",
        fadedRed: "#eb57572f",
        pagesBg: "#f3f5f8",
      },
      screens: {
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1400px",
      },
    },
  },
  plugins: [
    require(path.resolve(
      __dirname,
      "src/@main/tailwind/plugins/icon-size.cjs"
    )),
  ],
};
