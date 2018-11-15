const browserSync = require("browser-sync");

// ミドルウェア [return Buffer]
const mwEJS = require("./mw_ejs.js");
const mwSASS = require("./mw_sass.js");
const mwSSI = require("./mw_ssi.js");
const mwBABEL = require("./mw_babel");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const hasRootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ
const port = 3000; // ポート
const fileWatch = [hasRootDir + "/**/*.{html,css,js,ejs}"]; // リロードの監視ファイル
const httpsOptions = {
  pfx: "config/ssl/ssl.pfx", // 証明書を読込
  passphrase: "test" // 証明書のパスワード
};

// htmlをコンパイル
const reqLoaderHtml = {
  reqFile: [/\.html$/],
  command: [
    {
      process: mwEJS,
      option: {
        baseDir: hasRootDir,
        ext: ".html",
        convert: ".ejs"
      }
    },
    {
      process: mwSSI,
      option: {
        baseDir: hasRootDir,
        ext: ".html"
      }
    }
  ]
};

// cssをコンパイル
const reqLoaderCss = {
  reqFile: [/\.css$/],
  command: [
    {
      process: mwSASS,
      option: {
        baseDir: hasRootDir,
        ext: ".css",
        convert: ".scss"
      }
    }
  ]
};

// jsをコンパイル
const reqLoaderJs = {
  reqFile: [/\/assets\/js\/.*\.js$/],
  command: [
    {
      process: mwBABEL,
      option: {
        baseDir: hasRootDir
      }
    }
  ]
};

// ミドルウェアを読み込んで直列処理する
const mwReq = opt => {
  return (req, res, next) => {
    let requestPath = req ? req.url : false;
    if (/\/$/.test(requestPath)) requestPath += "index.html";

    switch (true) {
      case /\.css$/.test(requestPath):
        res.setHeader("Content-Type", "text/css");
        break;
      case /\.js$/.test(requestPath):
        res.setHeader("Content-Type", "text/javascript");
        break;
    }

    let match = !opt.reqFile.every(reg => {
      return !reg.test(requestPath);
    });
    if (match) {
      let data;
      opt.command.some((cmd, index) => {
        (async () => {
          data = cmd.process(requestPath, data, cmd.option);
          if (data.toString() === "[object Promise]") {
            await data.then(() => {
              data = mwBABEL.promiseResult; // babel用
            });
          }
          if (opt.command.length === index + 1) {
            res.end(data);
          }
        })();
      });
    } else {
      next();
    }
  };
};

// browserSync起動
const browserSyncStart = () => {
  browserSync({
    server: {
      baseDir: hasRootDir,
      middleware: [
        mwReq(reqLoaderHtml),
        mwReq(reqLoaderCss),
        mwReq(reqLoaderJs)
      ]
    },
    port: port,
    watch: true,
    files: fileWatch,
    https: httpsOptions, // httpの場合はfalseにする
    logFileChanges: false,
    open: true
  });
};

if (!isProduction) browserSyncStart();
