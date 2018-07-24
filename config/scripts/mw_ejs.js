const fs = require("fs-extra");
const path = require("path");
const ejs = require("ejs");

module.exports = mwEJS = opt => {
  opt.baseDir = opt.baseDir || ".";
  opt.requestPath = opt.requestPath || false;
  opt.data = opt.data || false;
  opt.ext = opt.ext || ".html";
  opt.convert = opt.convert || ".ejs";

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
    opt.requestPath.replace(new RegExp(`${opt.ext}$`), opt.convert)
  );

  // ejsがあるとき
  if (isExistFile(ejsPath)) {
    const ejsStr = opt.data
      ? opt.data.toString()
      : fs.readFileSync(ejsPath).toString();
    const ejsContent = ejs.render(ejsStr);
    return Buffer.from(ejsContent);
  } else {
    return false;
  }
};
