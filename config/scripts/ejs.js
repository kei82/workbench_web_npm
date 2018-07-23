module.exports = ejsMiddleWare = (opt) => {
  return (req, res, next) => {
    const fs = require("fs-extra");
    const url = require("url");
    const path = require("path");
    const ejs = require("ejs");

    const requestPath = req ? url.parse(req.url).pathname : false;

    const isExistFile = (file) => {
      try {
        fs.statSync(file);
        return true;
      } catch (err) {
        if (err.code === "ENOENT") return false;
      }
    }

    if (requestPath) {
      // .html or / で終わるリクエストだけを対象とする
      if (!requestPath.match(/(\/|\.html)$/)) {
        return next();
      }

      // HTMLファイルが存在すれば、HTMLを返す
      const htmlPath =
        path.parse(requestPath).ext == ""
          ? `${requestPath}index.html`
          : requestPath;

      // ejs のファイルパスに変換
      const ejsPath = path.join("src", htmlPath.replace(/\.html$/, ".ejs"));

      // ejsファイルがなければ404を返す
      if (isExistFile(ejsPath)) {
        // ejsがファイルを見つけたのでコンパイルする
        const ejsContent = ejs.render(fs.readFileSync(ejsPath).toString());
        // コンパイル結果をレスポンスに渡す
        res.end(new Buffer(Buffer.from(ejsContent)));
        return next();
      }

      next();
    }
  };
};
