module.exports = mwEJS = (requestPath, data, opt) => {
  const fs = require("fs-extra");
  const ejs = require("ejs");

  let htmlPath = opt.baseDir + requestPath; // htmlのパス変換
  let ejsPath = htmlPath.replace(new RegExp(`${opt.ext}$`), opt.convert); // ejsのパス変換

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
      console.log(
        "\x1b[41m\x1b[37m",
        `EJS Compile Error`,
        "\x1b[0m\x1b[31m",
        "\n" + ejsPath,
        "\n" + err,
        "\x1b[0m"
      );
      return Buffer.from(`EJS Compile Error\n${err}`);
    }
    return Buffer.from(ejsContent);
  } else if (fs.pathExistsSync(htmlPath)) {
    return fs.readFileSync(htmlPath);
  } else {
    return Buffer.from(`Not Found ${htmlPath}`);
  }
};
