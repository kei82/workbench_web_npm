module.exports = mwBABEL = (requestPath, data, opt) => {
  const fs = require("fs-extra");
  const webpack = require("webpack");
  const webpackConfig = require(process.cwd() + "/webpack.config.js");
  const filePath = requestPath.replace(/.*\//, ""); // ファイルパス変換
  const jsPath = opt.baseDir + requestPath; // jsのパス変換
  const babelPath = "./" + jsPath.replace(/\/js\//, "/babel/"); // babelのパス変換

  if (!requestPath) throw requestPath;
  if (fs.pathExistsSync(jsPath)) {
    return fs.readFileSync(jsPath);
  } else {
    return new Promise((resolve, reject) => {
      webpackConfig.entry = babelPath;
      webpackConfig.output.filename = filePath;
      const compiler = webpack(webpackConfig);
      compiler.run((err, stats) => {
        if (err) throw err;
        resolve(stats.compilation.assets[filePath].source());
      });
    });
  }
};
