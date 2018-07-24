const fs = require("fs-extra");
const url = require("url");
const nodeSSI = require("node-ssi");

module.exports = mwSSI = opt => {
  opt.baseDir = opt.baseDir || ".";
  opt.ext = opt.ext || ".html";
  opt.middleware = opt.middleware || [];

  const ssi = new nodeSSI(opt);

  return (req, res, next) => {
    let requestPath = req ? url.parse(req.url).pathname : false;
    requestPath = /\/$/.test(requestPath)
      ? requestPath + "index" + opt.ext
      : requestPath;

    if (!new RegExp(`${opt.ext}$`).test(requestPath)) return next();

    let filePath;
    let fileData;

    // ミドルウェアがあるとき
    if (opt.middleware.length > 0) {
      opt.middleware.forEach(func => {
        fileData = func({
          baseDir: opt.baseDir,
          requestPath: requestPath,
          data: fileData
        });
      });
    }

    if (!fileData) {
      fileData = fs.readFileSync(opt.baseDir + requestPath);
    }

    // ssiコンパイル
    ssi.compile(fileData.toString(), (err, content) => {
      if (err) {
        if (err.code == "ENOENT") return next();
        return next(err);
      }
      res.end(content);
    });
  };
};
