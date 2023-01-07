const path = require("path");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      height: {
        700: 700,
      },
      width: {
        700: 700,
      },
      minWidth: {
        700: 700,
      },
      colors: {
        perfBlue: "#2F80ED",
        perfBlue2: "#0D65DB",
        perfGray: "#8D8D8D",
        perfGray1: "#333333",
        perfGray2: "#4f4f4f",
        perfGray3: "#828282",
        perfGray4: "#BDBDBD",
        perfOfWhite: "#f9fbfc",
        perfLigtGray: "#fafafa",
        perfSecondary: "#C32B43",
        perfLightBlack: "#45464E",
        perfBlack30: "#8B8D97",
        perfBlack90: "#2C2D33",
        gray70: "#F7F7FC",
        green: "#27AE60",
        yellow: "#F2C94C",
        red: "#EB5757",
        orange: "#F2994A",
        fadedGreen: "#27ae5f36",
        fadedYellow: "#f2c84c2f",
        fadedRed: "#eb57572f",
        pagesBg: "#f3f5f8",
        perfLightBlue: "#ECF4FF",
        perfLightGray: "#F6F6F6",
        scoreGreen: "#00E096",
        scoreRed: "#EB5757",
        scoreYallow: "#F2C94C",
        scoreGray: "#00E096",
        loginBlue: "#2D4377",
      },
      screens: {
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1400px",
      },
      rotate: {
        320: "320deg",
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
