const fs = require("fs-extra");
const ssi = require("ssi");

module.exports = mwSSI = (requestPath, data, opt) => {
  // ファイルパス変換
  const filePath = opt.baseDir + requestPath;

  // Dataかファイルが存在するとき
  if (fs.pathExistsSync(filePath) || data) {
    // ファイル読み込み
    const fileData = !data ? fs.readFileSync(filePath) : data;

    // ssiコンパイル
    const parser = new ssi(opt.baseDir, opt.baseDir, "/**/*" + opt.ext);
    let ssiContent;
    try {
      ssiContent = parser.parse(filePath, fileData.toString()).contents;
    } catch (err) {
      console.log(
        "\x1b[41m\x1b[37m",
        `SSI Compile Error`,
        "\x1b[0m\x1b[31m",
        "\n" + err
      );
      return Buffer.from(`SSI Compile Error\n${err}`);
    }
    return Buffer.from(ssiContent);
  } else {
    return Buffer.from(`Not Found ${filePath}`);
  }
};
