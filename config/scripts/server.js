const browserSync = require('browser-sync');
const connectSSI = require('connect-ssi');

const port = 3000; // ポート
const rootDir = 'src'; // ルートディレクトリ
const options = {
  pfx: 'config/ssl/ssl.pfx', // 証明書を読込
  passphrase: 'test' // 証明書のパスワード
};

browserSync({
  server: {
    baseDir: rootDir,
    middleware: [
      connectSSI({
        baseDir: rootDir,
        ext: '.html'
      })
    ]
  },
  port: port,
  watch: true,
  files: [rootDir + '/**/*.{html,css,js}'],
  https: options, // 使わない場合はfalseにする
  logFileChanges: false
});
