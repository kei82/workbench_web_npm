"use strict";
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
      browsers: ["IE 11", "last 2 versions"],
      grid: true
    })
  ]
});
