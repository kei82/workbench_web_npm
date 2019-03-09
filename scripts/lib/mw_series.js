/**
 * ミドルウェアを受け取って直列処理する
 * @param {Function[]} middlewares ミドルウェア群
 * @param {String} requestPath ファイルパス
 * @param {(Promise<Buffer>|undefined)} data バッファデータを使うとき渡す
 * @return {(Promise<Buffer>} 直列処理結果
 */
module.exports = async (middlewares, requestPath, data) => {
  for (let mw of middlewares) data = await mw(requestPath, data);
  return data;
};
