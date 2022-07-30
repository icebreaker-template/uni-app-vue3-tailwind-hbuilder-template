const path = require("path");
const resolve = (p) => {
  return path.resolve(__dirname, p);
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.{html,js,ts,jsx,tsx,vue}"].map(resolve),
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
