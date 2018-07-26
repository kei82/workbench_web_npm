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

  // ejsかdataがあるとき
  if (isExistFile(ejsPath) || data) {
    // ファイル読み込み
    const ejsData = data ? data : fs.readFileSync(ejsPath);
    const ejsStr = ejsData.toString();

    // ejsコンパイル
    let ejsContent;
    try {
      ejsContent = ejs.render(ejsStr);
    } catch (err) {
      return Buffer.from(
        `EJS Compile Error\nAfter solving the problem\nPlease reload yourself\n${err}`
      );
    }
    return Buffer.from(ejsContent);
  } else {
    return data || false;
  }
};
