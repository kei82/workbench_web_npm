const fs = require("fs-extra");
const path = require("path");
const ssi = require("ssi");

module.exports = mwSSI = (rootDir, requestPath, data) => {
  let opt = {
    baseDir: rootDir,
    ext: ".html"
  };

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
  const filePath = path.join(opt.baseDir, requestPath);

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
      return Buffer.from(
        `SSI Compile Error\nAfter solving the problem\nPlease reload yourself\n${err}`
      );
    }
    return Buffer.from(ssiContent);
  } else {
    return `Not Find ${filePath}\nAfter solving the problem\nPlease reload yourself`;
  }
};
