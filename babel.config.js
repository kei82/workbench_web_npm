module.exports = api => {
  api.cache(true);

  return {
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
};
