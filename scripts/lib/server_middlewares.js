"use strict";
// ミドルウェア [return Promise Buffer]
const mwEjs = require("./mw_ejs");
const mwSsi = require("./mw_ssi");

module.exports = async (req, res, next) => {
  if (/\/$/.test(req.url)) req.url += "index.html";

  // ミドルウェアを直列処理する
  const mwSeries = async (middlewares, url, data) => {
    for (let cmd of middlewares) data = await cmd(url, data);
    return data;
  };

  // リクエストで判定
  let resData;
  switch (true) {
    // htmlをコンパイル
    case /\.html$/.test(req.url):
      resData = mwSeries([mwEjs, mwSsi], req.url);
      break;

    default:
      throw "Unknown Type";
  }

  // サーバーに返す
  if (resData) res.end(await resData);
  else next();
};
