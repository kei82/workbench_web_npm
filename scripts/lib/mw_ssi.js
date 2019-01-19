const fs = require("fs-extra");
const ssi = require("ssi");

module.exports = async (requestPath, data) => {
  const filePath = "src" + requestPath; // ファイルパス変換

  // Dataかファイルが存在するとき
  if (fs.pathExistsSync(filePath) || data) {
    // 読み込み
    const fileData = data ? await data : fs.readFileSync(filePath);

    // ssiコンパイル
    const ssiParser = new ssi("src", "src", "**/*.html");
    let ssiContent = ssiParser.parse(filePath, fileData.toString()).contents;
    ssiContent = Promise.resolve(Buffer.from(ssiContent));

    return ssiContent;
  }
};
