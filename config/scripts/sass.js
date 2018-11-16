const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Buffer]
const mwSASS = require("./mw_sass.js");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const hasRootDir = !isProduction ? "src" : "dist"; // 出力先
const scssPath = "src/"; // scssの読込場所
const cssPath = hasRootDir + "/"; // cssの出力場所
const scssFiles = [scssPath + "**/!(_)*.scss"]; // scssを読込パターン
let mwOptions = {
  baseDir: scssPath,
  ext: ".css",
  convert: ".scss"
};
let globOptions = {
  matchBase: true,
  onlyFiles: true
};

// scssのパス変換
const toCssPath = path => {
  return path
    .replace(new RegExp(`^${scssPath}`), cssPath)
    .replace(/sass\//, "css/")
    .replace(new RegExp(`${mwOptions.convert}$`), mwOptions.ext);
};

// sassコンパイル
const sassCompile = (requestPath, data) => {
  const sassContent = mwSASS(
    toCssPath(requestPath).replace(new RegExp(`^${cssPath}`), ""),
    data,
    mwOptions
  );
  if (sassContent) fs.outputFile(toCssPath(requestPath), sassContent);
};

// ファイルの取得
const glob = (pattern, func, options = globOptions) => {
  globby(pattern, options).then(files => {
    for (let path of files) func(path, fs.readFileSync(path));
  });
};

const compileStart = () => {
  glob(scssFiles, sassCompile);
};

if (isProduction) compileStart();
