const fs = require("fs-extra");

module.exports = mwRedirect = (requestPath, data, opt) => {
  let srcFilePath = "src" + requestPath;
  let distFilePath = "dist" + requestPath;

  if (fs.pathExistsSync(distFilePath)) {
    return fs.readFileSync(distFilePath);
  } else if (fs.pathExistsSync(srcFilePath)) {
    return fs.readFileSync(srcFilePath);
  } else {
    return Buffer.from(`Not Found ${distFilePath}`);
  }
};
