const fs = require("fs-extra");
const ejs = require("ejs");

/**
 * ejsコンパイル
 * @param {String} requestPath ファイルパス
 * @param {(Promise<Buffer>|undefined)} data バッファデータを使うとき渡す
 * @return {Promise<Buffer>} コンパイル結果
 */
module.exports = async (requestPath, data) => {
  const htmlPath = "src" + requestPath; // htmlのパス変換
  const ejsPath = htmlPath.replace(/\.html/, ".ejs"); // ejsのパス変換

  // Dataかファイルが存在するとき
  if (fs.pathExistsSync(ejsPath) || data) {
    // 読み込み
    const ejsData = data ? await data : fs.readFileSync(ejsPath);

    // ejsコンパイル
    let ejsContent = Buffer.from(ejs.render(ejsData.toString()));

    return ejsContent;
  }
};
