module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["ie >= 11", "> 1%", "not op_mini all"]
        },
        useBuiltIns: "usage"
      }
    ]
  ]
};
