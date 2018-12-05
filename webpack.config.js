const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定

module.exports = {
  target: "web",
  mode: process.env.NODE_ENV,
  devtool: isProduction ? "none" : "cheap-module-eval-source-map",
  context: process.cwd(),
  entry: "",
  output: {
    filename: ""
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader?cacheDirectory"
          }
        ]
      }
    ]
  }
};
