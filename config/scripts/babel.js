const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Buffer]
const mwBABEL = require("./modules/mw_babel.js");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
let mwOptions = {
  baseDir: "src/"
};
const ejsFiles = [mwOptions.baseDir + "**/babel/**/*.js"]; // babelを読込パターン
let globOptions = {
  matchBase: true,
  onlyFiles: true
};

const babelCompile = path => {
  inputPath = path
    .replace(mwOptions.baseDir, "/")
    .replace(/\/babel\//g, "/js/");
  outputPath = inputPath.replace(/^\//, "dist/");

  mwBABEL(inputPath, false, mwOptions).then((result) => {
    fs.outputFileSync(outputPath, result);
  });
};

const glob = (pattern, func, options = globOptions) => {
  globby(pattern, options).then(files => {
    for (let path of files) func(path);
  });
};

const compileStart = () => {
  glob(ejsFiles, babelCompile);
};

if (isProduction) compileStart();
