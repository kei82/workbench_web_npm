"use strict";
// プロダクションビルド判定
const isProduction = process.env.NODE_ENV === "production";

// エントリーポイント
const entryPoint = require("./scripts/lib/entry_point");

// ミドルウェア
const serverMiddlewares = require("./scripts/lib/server_middlewares");

// プラグイン
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");

// モジュール
// Babel
const moduleBabel = {
  test: /\.js$/,
  use: ["babel-loader?cacheDirectory"]
};
// Sass
const moduleSass = {
  test: /\.scss$/,
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
        sourceMap: true,
        plugins: [
          mqpacker({
            sort: (a, b) => {
              return b.localeCompare(a);
            }
          }),
          autoprefixer({
            browsers: ["IE 11", "last 2 versions"]
          })
        ]
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
  devtool: isProduction ? false : "source-map",
  context: process.cwd(),
  entry: entryPoint,
  output: {
    filename: "[name].js",
    path: process.cwd() + "/dist"
  },
  devServer: {
    contentBase: "./src",
    watchContentBase: true,
    open: true,
    https: false,
    overlay: true,
    stats: "minimal",
    before: app => {
      app.get(/(\/|\.html)$/, serverMiddlewares);
    }
  },
  plugins: [new miniCssExtractPlugin()],
  module: {
    rules: [moduleBabel, moduleSass]
  }
};
