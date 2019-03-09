// ミドルウェア
const mwSeries = require("./mw_series");
const mwEjs = require("./mw_ejs");
const mwSsi = require("./mw_ssi");

/**
 * htmlリクエストをコンパイルしてサーバーに返す
 * @param {Object} req リクエスト情報
 * @param {Object} res レスポンス情報
 * @param {Function} next 次の処理へ
 * @return {Void}
 */
module.exports = async (req, res, next) => {
  // フォルダの場合index.htmlとして扱う
  if (/\/$/.test(req.url)) req.url += "index.html";

  // リクエストで判定
  let resData = mwSeries([mwEjs, mwSsi], req.url);

  // サーバーに返す
  if (resData) res.end(await resData);
  else next();
};
