const fs = require("fs-extra");
const ejs = require("ejs");

module.exports = mwEJS = (requestPath, data, opt) => {
  // htmlのパス変換
  let htmlPath = opt.baseDir + requestPath;
  // ejsのパス変換
  let ejsPath =
    opt.baseDir + requestPath.replace(new RegExp(`${opt.ext}$`), opt.convert);

  // ejsかdataがあるとき
  if (fs.pathExistsSync(ejsPath) || data) {
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
  } else if (fs.pathExistsSync(htmlPath)) {
    return fs.readFileSync(htmlPath);
  } else {
    return data || Buffer.from(`Not Found ${htmlPath}`);
  }
};
