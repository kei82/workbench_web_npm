// プロダクションビルド判定
const isProduction = process.env.NODE_ENV === "production";

// エントリーポイント
const entryPoint = require("./scripts/lib/entry_point");

// プラグイン
const miniCssExtractPlugin = require("mini-css-extract-plugin");

// サーバーアプリケーション
const serverApp = app => {
  // ミドルウェア
  const connectSSI = require("connect-ssi");

  app.use(
    connectSSI({
      baseDir: __dirname + "/src",
      ext: ".html"
    })
  );
};

// モジュール Babel
const moduleBabel = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: ["babel-loader?cacheDirectory"]
};

// モジュール Sass
const moduleSass = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    miniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        url: false,
        import: false,
        sourceMap: true,
        importLoaders: 2
      }
    },
    {
      loader: "postcss-loader?cacheDirectory",
      options: {
        sourceMap: true
      }
    },
    {
      loader: "sass-loader?cacheDirectory",
      options: {
        outputStyle: "compressed",
        sourceMap: true
      }
    }
  ]
};

// オプションをエクスポート
module.exports = {
  target: "web",
  mode: process.env.NODE_ENV,
  devtool: isProduction ? false : "inline-source-map",
  context: __dirname,
  entry: entryPoint,
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  devServer: {
    contentBase: "./src",
    watchContentBase: true,
    open: true,
    https: false,
    overlay: true,
    stats: "minimal",
    before: serverApp
  },
  plugins: [new miniCssExtractPlugin()],
  module: {
    rules: [moduleBabel, moduleSass]
  }
};
