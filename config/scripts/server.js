const fs = require("fs-extra");
const url = require("url");
const browserSync = require("browser-sync");

// ミドルウェア [return Buffer]
const mwEJS = require("./mw_ejs.js");
const mwSSI = require("./mw_ssi.js");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const rootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ
const port = 3000; // ポート
const httpsOptions = {
  pfx: "config/ssl/ssl.pfx", // 証明書を読込
  passphrase: "test" // 証明書のパスワード
};

// ミドルウェアを読み込んで直列処理する
mwReqLoader = opt => {
  return (req, res, next) => {
    let requestPath = req ? url.parse(req.url).pathname : false;
    if (/\/$/.test(requestPath)) requestPath += "index.html";
    opt.some(set => {
      let match = !set.reqFile.every(reg => {
        return !reg.test(requestPath);
      });
      if (match) {
        let data;
        set.command.some((cmd, index) => {
          data = cmd(rootDir, requestPath, data);
          if (set.command.length === index + 1) res.end(data);
        });
      } else {
        return next();
      }
    });
  };
};

// browserSync起動
if (!isProduction)
  browserSync({
    server: {
      baseDir: rootDir,
      middleware: [
        mwReqLoader([
          {
            reqFile: [/\.html$/],
            command: [mwEJS, mwSSI]
          }
        ])
      ]
    },
    port: port,
    watch: true,
    files: [rootDir + "/**/*.{html,css,js,ejs}"],
    https: httpsOptions, // httpの場合はfalseにする
    logFileChanges: false,
    open: true
  });
