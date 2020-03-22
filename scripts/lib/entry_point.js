const glob = require("glob");

/**
 * エントリーポイント作成
 * @param {Object} entryPoint 初期値
 * @return {Object} エントリーポイント
 */
module.exports = (entryPoint = {}) => {
  /**
   * エントリーポイント追加
   * @param {string} patterns ファイル検索パターン（ワイルドカード）
   * @param {replaceFunc} replaceFunc ファイルパスを返すコールバック
   * @callback replaceFunc ビルド元からビルド先のパスに置換
   * @param {string} path
   */
  const addEntryPoint = (patterns, replaceFunc) => {
    let entryFiles = glob.sync(patterns, { nodir: true });
    for (let path of entryFiles) {
      let accessPath = replaceFunc(path)
        .replace(/^src\//, "")
        .replace(/\.[^.]*$/, "");
      entryPoint[accessPath] = "./" + path;
    }
  };

  // babelをエントリーポイントに追加
  addEntryPoint("src/**/babel/**/!(_)*.js", path => {
    return path.replace("/babel/", "/js/");
  });

  // sassをエントリーポイントに追加
  addEntryPoint("src/**/sass/**/!(_)*.scss", path => {
    return path.replace("/sass/", "/css/");
  });

  return entryPoint;
};
