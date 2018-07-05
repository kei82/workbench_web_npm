const fs = require('fs');
const interfaces = require('os').networkInterfaces();
const opener = require("opener");
const http = require('http');
const https = require('https');
const express = require('express');
const connectSSI = require('connect-ssi');
const browserSync = require('browser-sync');
const connectBrowserSync = require('connect-browser-sync');

const cwd = process.cwd().replace(/\\/g, '/') + '/';
const httpPort = 8000; // httpポート
const httpsPort = 8001; // httpsポート
const rootDir = 'src'; // ルートディレクトリ
const options = {
  pfx: fs.readFileSync('config/ssl/ssl.pfx'), // 証明書を読込
  passphrase: 'test' // 証明書のパスワード
};
const app = express()
  .use(connectBrowserSync( // BrowserSyncを使用
    browserSync.create().init({
      logFileChanges: false,
      logSnippet: false,
      logConnections: false,
      watch: true,
      files: ['src/**/*.{html,css}']
    })
  ))
  .use(connectSSI({ // SSIを使用
    baseDir: rootDir,
    ext: '.html'
  }))
  .use(express.static(rootDir));

http.createServer(app).listen(httpPort); // httpサーバー作成
https.createServer(options, app).listen(httpsPort); // httpsサーバー作成
opener(`http://localhost:${httpPort}`);

const addresses = Object.keys(interfaces)
  .reduce((results, name) => results.concat(interfaces[name]), [])
  .filter((iface) => iface.family === 'IPv4' && !iface.internal)
  .map((iface) => iface.address);

console.log(
  '\x1b[36m%s\x1b[0m',
  `[http server] http://localhost:${httpPort} \n` +
  `[https server] https://localhost:${httpsPort} \n` +
  `---------------------------------------- \n` +
  `[http server] http://${addresses[0]}:${httpPort} \n` +
  `[https server] https://${addresses[0]}:${httpsPort}`,
  '\x1b[0m'
);
