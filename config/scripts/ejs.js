const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Buffer]
const mwEJS = require("./modules/mw_ejs.js");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
let mwOptions = {
  baseDir: "src/",
  distDir: "dist/",
  ext: ".html",
  convert: ".ejs"
};
const ejsFiles = [mwOptions.baseDir + "**/*" + mwOptions.convert]; // ejsを読込パターン
let globOptions = {
  matchBase: true,
  onlyFiles: true
};

const ejsCompile = path => {
  const ejsContent = mwEJS(
    path
      .replace(new RegExp(`^${mwOptions.baseDir}`), "")
      .replace(new RegExp(`${mwOptions.convert}$`), mwOptions.ext),
    false,
    mwOptions
  );
  fs.outputFile(
    path
      .replace(new RegExp(`^${mwOptions.baseDir}`), mwOptions.distDir)
      .replace(new RegExp(`${mwOptions.convert}$`), mwOptions.ext),
    ejsContent
  );
};

const glob = (pattern, func, options = globOptions) => {
  globby(pattern, options).then(files => {
    for (let path of files) func(path);
  });
};

const compileStart = () => {
  glob(ejsFiles, ejsCompile);
};

if (isProduction) compileStart();
