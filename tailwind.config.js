const path = require("path");
const resolve = (p) => {
  return path.resolve(__dirname, p);
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.vue"].map(resolve),
  theme: {
    extend: {
      colors: {
        primary: '#18db9e'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
