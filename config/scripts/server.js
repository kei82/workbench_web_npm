const fs = require("fs-extra");
const url = require("url");
const browserSync = require("browser-sync");
const mwEJS = require("./mw_ejs.js");
const mwSSI = require("./mw_ssi.js");

const isProduction = process.env.NODE_ENV === "production" ? true : false; // プロダクションビルド判定
const port = 3000; // ポート
const rootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ
const httpsOptions = {
  pfx: "config/ssl/ssl.pfx", // 証明書を読込
  passphrase: "test" // 証明書のパスワード
};

// ミドルウェアを読み込んで処理する
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
          console.log(data);
          data = cmd(rootDir, requestPath, data);
          if (set.command.length === index + 1) res.end(data);
        });
      }
    });
  };
};

// browserSync起動
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
  files: [rootDir + "/**/*.{html,css,js}"],
  https: httpsOptions, // 使わない場合はfalseにする
  logFileChanges: false
});
