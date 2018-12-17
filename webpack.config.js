"use strict";

// プロダクションビルド判定
const isProduction = process.env.NODE_ENV === "production";
// エントリーポイント
const entryPoint = require("./scripts/lib/entry_point");
// ミドルウェア
const serverMiddlewares = require("./scripts/lib/server_middlewares");
// プラグイン
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");
// モジュール
// Babel
const moduleBabel = {
  test: /\.js$/,
  use: [
    {
      loader: "babel-loader?cacheDirectory"
    }
  ]
};
// Sass
const moduleSass = {
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
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
      loader: "postcss-loader",
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
      loader: "sass-loader",
      options: {
        outputStyle: "compressed",
        sourceMap: true
      }
    }
  ]
};

// オプションを返す
module.exports = () => {
  return {
    target: "web",
    mode: process.env.NODE_ENV,
    devtool: isProduction ? "none" : "source-map",
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
      https: true,
      overlay: true,
      stats: "minimal",
      before: app => {
        app.get(/(\/|\.html)$/, (req, res) => serverMiddlewares(req, res));
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    module: {
      rules: [moduleBabel, moduleSass]
    }
  };
};
