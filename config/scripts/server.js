const fs = require('fs');
const interfaces = require('os').networkInterfaces();
const http = require('http');
const https = require('https');
const serveStatic = require('serve-static');
const connect = require('connect');
const connectSSI = require('connect-ssi');

const httpPort = 3000; // httpポート
const httpsPort = 3001; // httpsポート
const rootDir = process.cwd().replace(/\\/g, '/') + '/src/'; // ルートディレクトリ
const options = {
  pfx: fs.readFileSync('config/ssl/ssl.pfx'), // 証明書を読込
  passphrase: 'test' // 証明書のパスワード
};
const app = connect()
  .use(connectSSI({ // SSIを使用
    baseDir: rootDir,
    ext: '.html'
  }))
  .use(serveStatic(rootDir));

http.createServer(app).listen(httpPort); // httpサーバー作成
https.createServer(options, app).listen(httpsPort); // httpsサーバー作成

const addresses = Object.keys(interfaces)
  .reduce((results, name) => results.concat(interfaces[name]), [])
  .filter((iface) => iface.family === 'IPv4' && !iface.internal)
  .map((iface) => iface.address);

console.log(
  '\x1b[36m%s\x1b[0m',
  `[http server] http://localhost:${httpPort} \n` +
  `[https server] https://localhost:${httpsPort} \n` +
  `------------------------------------------------- \n` +
  `[http server] http://${addresses[0]}:${httpPort} \n` +
  `[https server] https://${addresses[0]}:${httpsPort}`,
  '\x1b[0m'
);
