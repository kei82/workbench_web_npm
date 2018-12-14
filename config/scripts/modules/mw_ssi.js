"use strict";

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const hasRootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ

module.exports = (requestPath, data) => {
  const fs = require("fs-extra");
  const ssi = require("ssi");

  const filePath = hasRootDir + requestPath; // ファイルパス変換

  // Dataかファイルが存在するとき
  if (fs.pathExistsSync(filePath) || data) {
    const fileData = !data ? fs.readFileSync(filePath) : data; // ファイル読み込み
    const parser = new ssi(hasRootDir, hasRootDir, "/**/*.html", true); // ssiコンパイル

    let ssiContent;
    try {
      ssiContent = parser.parse(filePath, fileData.toString()).contents;
    } catch (err) {
      console.error(err);
      return Buffer.from(`SSI Compile Error\n${err}`);
    }
    return Buffer.from(ssiContent);
  }
};
