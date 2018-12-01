const browserSync = require("browser-sync").create();

// ミドルウェアを直列処理する
const reqSeries = require("./modules/req_series.js");

// ミドルウェア [return Buffer]
const mwEJS = require("./modules/mw_ejs.js");
const mwSASS = require("./modules/mw_sass.js");
const mwSSI = require("./modules/mw_ssi.js");
const mwBABEL = require("./modules/mw_babel");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const hasRootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ

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

// browserSync 設定
const bsOptions = {
  server: {
    baseDir: hasRootDir
  },
  middleware: [
    reqSeries(reqLoaderHtml),
    reqSeries(reqLoaderCss),
    reqSeries(reqLoaderJs)
  ],
  port: 3000,
  https: {
    pfx: "config/ssl/ssl.pfx", // 証明書を読込
    passphrase: "test" // 証明書のパスワード
  }, // httpの場合はfalseにする
  logFileChanges: false,
  open: true
};

// browserSync起動
const browserSyncStart = () => {
  browserSync.watch(hasRootDir + "/**/*.{html,css,js,ejs}", browserSync.reload);
  browserSync.init(bsOptions);
};

if (!isProduction) browserSyncStart();
