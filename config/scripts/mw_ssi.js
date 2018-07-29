const fs = require("fs-extra");
const ssi = require("ssi");

module.exports = mwSSI = (requestPath, data, opt) => {
  // パスの存在判定
  const isExistFile = file => {
    try {
      fs.statSync(file);
      return true;
    } catch (err) {
      if (err.code === "ENOENT") return false;
    }
  };

  // ファイルパス変換
  const filePath = opt.baseDir + requestPath;

  // Dataかファイルが存在するとき
  if (isExistFile(filePath) || data) {
    // ファイル読み込み
    const fileData = !data ? fs.readFileSync(filePath) : data;

    // ssiコンパイル
    const parser = new ssi(opt.baseDir, opt.baseDir, "/**/*" + opt.ext);
    let ssiContent;
    try {
      ssiContent = parser.parse(filePath, fileData.toString()).contents;
    } catch (err) {
      return Buffer.from(`SSI Compile Error\n${err}`);
    }
    return Buffer.from(ssiContent);
  } else {
    return data || Buffer.from(`Not ${filePath}`);
  }
};
