"use strict";
module.exports = async (requestPath, data) => {
  const fs = require("fs-extra");
  const ejs = require("ejs");

  let htmlPath = "src" + requestPath; // htmlのパス変換
  let ejsPath = htmlPath.replace(/\.html/, ".ejs"); // ejsのパス変換

  // ejsかdataがあるとき
  if (fs.pathExistsSync(ejsPath) || data) {
    // ファイル読み込み
    const ejsData = data ? await data : fs.readFileSync(ejsPath);

    // ejsコンパイル
    let ejsContent = ejs.render(ejsData.toString());
    ejsContent = Promise.resolve(Buffer.from(ejsContent));

    return ejsContent;
  }
};
