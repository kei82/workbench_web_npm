// ミドルウェア
const mwEjs = require("./mw_ejs");
const mwSsi = require("./mw_ssi");

/**
 * サーバーアプリケーション
 * @param {Object} req リクエスト情報
 * @param {Object} res レスポンス情報
 * @param {Function} next 次の処理へ
 * @return {Void}
 */
module.exports = async (req, res, next) => {
  if (/\/$/.test(req.url)) req.url += "index.html";

  /**
   * ミドルウェアを直列処理する
   * @param {Function[]} middlewares ミドルウェア群
   * @param {String} requestPath ファイルパス
   * @param {(Promise<Buffer>|undefined)} data バッファデータを使うとき
   * @return {(Promise<Buffer>} 直列処理結果
   */
  const mwSeries = async (middlewares, requestPath, data) => {
    for (let mw of middlewares) data = await mw(requestPath, data);
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
