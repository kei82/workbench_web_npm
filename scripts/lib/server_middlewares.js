"use strict";
module.exports = (req, res) => {
  if (/\/$/.test(req.url)) req.url += "index.html";

  // ミドルウェアを直列処理する
  const reqSeries = async (req, res, middlewares) => {
    let data;
    for (let cmd of middlewares) {
      data = await cmd(req.url, data, cmd.option);
    }
    if (data) res.end(data);
    else res.status(404).end(`Not found ${req.url}`);
  };

  // ミドルウェア [return Promise Buffer]
  const mwEjs = require("./mw_ejs");
  const mwSsi = require("./mw_ssi");

  // リクエストで判定
  switch (true) {
    // htmlをコンパイル
    case /\.html$/.test(req.url):
      reqSeries(req, res, [mwEjs, mwSsi]);
      break;

    default:
      throw "Unknown Type";
  }
};
