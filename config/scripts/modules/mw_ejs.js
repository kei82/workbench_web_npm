"use strict";

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const hasRootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ

module.exports = (requestPath, data) => {
  const fs = require("fs-extra");
  const ejs = require("ejs");

  let htmlPath = hasRootDir + requestPath; // htmlのパス変換
  let ejsPath = htmlPath.replace(/\.html/, ".ejs"); // ejsのパス変換

  // ejsかdataがあるとき
  if (fs.pathExistsSync(ejsPath) || data) {
    // ファイル読み込み
    const ejsData = data ? data : fs.readFileSync(ejsPath);
    const ejsStr = ejsData.toString();

    // ejsコンパイル
    let ejsContent = ejs.render(ejsStr, err => {
      if (err) throw err;
    });

    return Buffer.from(ejsContent);
  }
};
