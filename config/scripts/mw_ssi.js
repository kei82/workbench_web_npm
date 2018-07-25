const fs = require("fs-extra");
const path = require("path");
const nodeSSI = require("node-ssi");

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
  if (data || isExistFile(filePath)) {
    // ファイル読み込み
    const fileData = !data ? fs.readFileSync(filePath) : data;

    // ssiコンパイル
    const ssi = new nodeSSI(opt);
    ssi.compile(fileData.toString(), (err, content) => {
      if (err) throw err;
      else return Buffer.from(content);
    });
  } else {
    return `Not Find ${filePath}`;
  }
};
