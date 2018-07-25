const browserSync = require("browser-sync");
const mwSSI = require("./mw_ssi.js");
const mwEJS = require("./mw_ejs.js");

const isProduction = process.env.NODE_ENV === "production" ? true : false; // プロダクションビルド判定
const port = 3000; // ポート
const rootDir = !isProduction ? "src" : "dist"; // ルートディレクトリ
const httpsOptions = {
  pfx: "config/ssl/ssl.pfx", // 証明書を読込
  passphrase: "test" // 証明書のパスワード
};

browserSync({
  server: {
    baseDir: rootDir,
    middleware: [
      mwSSI({
        baseDir: rootDir,
        ext: ".html",
        middleware: [mwEJS]
      })
    ]
  },
  port: port,
  watch: true,
  files: [rootDir + "/**/*.{html,css,js}"],
  https: httpsOptions, // 使わない場合はfalseにする
  logFileChanges: false
});
