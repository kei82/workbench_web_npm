const fs = require("fs-extra");
const glob = require("glob");

// ミドルウェア
const mwEJS = require("./lib/mw_ejs");

/**
 * ファイル出力
 * @param {String} path 入力先ファイルパス
 * @param {Buffer} content 出力内容
 * @return {Void}
 */
const ejsOutput = (path, content) => {
  let outputPath = path.replace(/^src\//, "dist/").replace(/\.ejs$/, ".html");
  fs.outputFile(outputPath, content);
};

/**
 * ejsコンパイル
 * @param {String} path 入力先ファイルパス
 * @return {Promise<Buffer>} コンパイル結果
 */
const ejsCompile = async path => {
  let htmlPath = path.replace(/^src\//, "/").replace(/\.ejs$/, ".html");
  return await mwEJS(htmlPath);
};

/**
 * ejsコンパイル
 * @param {String[]} pattern ファイル検索（ワイルドカード）
 * @param {Function} compile コンパイル
 * @param {Function} output ファイル出力
 * @return {Void}
 */
const compileStart = async (pattern, compile, output) => {
  let files = glob.sync(pattern);
  for (let path of files) {
    let content = await compile(path);
    if (output) output(path, content);
  }
};

compileStart("src/**/!(_)*.ejs", ejsCompile, ejsOutput);
