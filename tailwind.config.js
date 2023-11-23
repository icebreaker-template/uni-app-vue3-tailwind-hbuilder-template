const { resolve } = require('./shared')
const cssMacro = require('weapp-tailwindcss/css-macro')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.vue"].map(resolve),
  theme: {

  },
  plugins: [
    // https://weapp-tw.icebreaker.top/docs/quick-start/uni-app-css-macro
    cssMacro({
      variantsMap: {
        wx: 'MP-WEIXIN',
        '-wx': {
          value: 'MP-WEIXIN',
          negative: true
        }
      }
    })
  ],
  corePlugins: {
    preflight: false,
  },
};
