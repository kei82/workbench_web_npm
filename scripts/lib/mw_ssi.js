"use strict";
module.exports = async (requestPath, data) => {
  const fs = require("fs-extra");
  const ssi = require("ssi");

  const filePath = "src" + requestPath; // ファイルパス変換

  // Dataかファイルが存在するとき
  if (fs.pathExistsSync(filePath) || data) {
    const fileData = data ? await data : fs.readFileSync(filePath); // ファイル読み込み
    const ssiParser = new ssi("src", "src", "**/*.html", true); // ssiコンパイル

    // ssiコンパイル
    let ssiContent = ssiParser.parse(filePath, fileData.toString()).contents;
    ssiContent = Promise.resolve(Buffer.from(ssiContent));

    return ssiContent;
  }
};
