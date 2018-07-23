const SSI = require('node-ssi');
const fs = require('fs-extra');
const path = require('path');
const parseurl = require('parseurl');
const ejs = require("ejs");

module.exports = connectSSI = (opt) => {
  opt.baseDir = opt.baseDir || '.';
  opt.ext = opt.ext || '.shtml';

  const ssi = new SSI(opt);

  const endsWith = (str, suffix) => { // 最後の文字判定
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  const isExistFile = (file) => { // パスの存在判定
    try {
      fs.statSync(file);
      return true;
    } catch (err) {
      if (err.code === "ENOENT") return false;
    }
  }

  return (req, res, next) => {
    let url = parseurl(req).pathname;

    url = /\/$/.test(url) ? (url + 'index' + opt.ext) : url;

    if (!endsWith(url, opt.ext)) {
      return next();
    }

    let filePath;
    let fileData;
    let ejsPath = path.join(opt.baseDir, url.replace(/\.html$/, '.ejs')); // ejsのパス変換

    if(isExistFile(ejsPath)) { // ejsがあるか判定
      filePath = ejsPath;
      fileData = Buffer.from(ejs.render(fs.readFileSync(filePath).toString())); // ejsコンパイル
    } else {
      filePath = path.join(opt.baseDir, url);
      fileData = fs.readFileSync(filePath);
    }

    ssi.compile(fileData, (err, content) => { // ssiコンパイル
      if (err) {
        if (err.code == 'ENOENT' && err.path == filePath) {
          return next();
        }
        return next(err);
      }
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      res.end(content);
    });

  };
};