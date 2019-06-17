const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");

module.exports = () => ({
  plugins: [
    mqpacker({
      sort: (a, b) => {
        return b.localeCompare(a);
      }
    }),
    autoprefixer({
      grid: true
    })
  ]
});
