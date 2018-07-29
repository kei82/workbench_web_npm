const fs = require("fs-extra");
const ejs = require("ejs");

module.exports = mwEJS = (requestPath, data, opt) => {
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
  let ejsPath =
    opt.baseDir + requestPath.replace(new RegExp(`${opt.ext}$`), opt.convert);

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
      return Buffer.from(`EJS Compile Error\n${err}`);
    }
    return Buffer.from(ejsContent);
  } else {
    return data || Buffer.from(`Not ${ejsPath}`);
  }
};
