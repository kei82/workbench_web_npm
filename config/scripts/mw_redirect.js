const fs = require("fs-extra");

module.exports = mwRedirect = (requestPath, data, opt) => {
  let srcFilePath = "src" + requestPath;
  let distFilePath = "dist" + requestPath;

  // パスの存在判定
  const isExistFile = file => {
    try {
      fs.statSync(file);
      return true;
    } catch (err) {
      if (err.code === "ENOENT") return false;
    }
  };

  if (isExistFile(distFilePath)) {
    return fs.readFileSync(distFilePath);
  } else if (isExistFile(srcFilePath)) {
    return fs.readFileSync(srcFilePath);
  } else {
    return Buffer.from(`Not ${distFilePath}`);
  }
};
