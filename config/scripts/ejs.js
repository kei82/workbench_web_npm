"use strict";
const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Buffer]
const mwEJS = require("./modules/mw_ejs.js");

let opt = {
  baseDir: "src/",
  distDir: "dist/",
  ext: ".html",
  convert: ".ejs"
};
const ejsFiles = [opt.baseDir + "**/!(_)*" + opt.convert]; // ejsを読込パターン
let globOptions = {
  matchBase: true,
  onlyFiles: true
};

const ejsCompile = path => {
  const ejsContent = mwEJS(
    path
      .replace(new RegExp(`^${opt.baseDir}`), "")
      .replace(new RegExp(`${opt.convert}$`), opt.ext),
    false,
    opt
  );
  fs.outputFile(
    path
      .replace(new RegExp(`^${opt.baseDir}`), opt.distDir)
      .replace(new RegExp(`${opt.convert}$`), opt.ext),
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

compileStart();
