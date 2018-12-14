"use strict";

module.exports = (req, res) => {
  // ミドルウェアを直列処理する
  const reqSeries = require("./req_series");

  // ミドルウェア [return Buffer]
  const mwEjs = require("./mw_ejs");
  const mwSsi = require("./mw_ssi");

  // htmlをコンパイル
  const reqLoaderHtml = {
    command: [mwEjs, mwSsi]
  };

  switch (true) {
    case /\/$/.test(req.url):
      reqSeries(req, res, reqLoaderHtml);
      break;

    case /\.html$/.test(req.url):
      reqSeries(req, res, reqLoaderHtml);
      break;

    default:
      throw "Unknown Type";
  }
};
