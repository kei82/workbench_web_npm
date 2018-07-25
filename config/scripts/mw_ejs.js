const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");

module.exports = mwEJS = (rootDir, requestPath, data) => {
  let opt = {
    baseDir: rootDir,
    ext: ".html",
    convert: ".ejs"
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

  // ejsのパス変換
  let ejsPath = path.join(
    opt.baseDir,
    requestPath.replace(new RegExp(`${opt.ext}$`), opt.convert)
  );

  // ejsがあるとき
  if (isExistFile(ejsPath)) {
    // ファイル読み込み
    const ejsData = fs.readFileSync(ejsPath);
    const ejsStr = data ? data.toString() : ejsData.toString();

    // ejsコンパイル
    return Buffer.from(ejs.render(ejsStr));
  } else {
    return data || false;
  }
};
