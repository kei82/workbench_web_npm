"use strict";
const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Promise Buffer]
const mwEJS = require("./lib/mw_ejs.js");

const ejsFiles = ["src/**/!(_)*.ejs"]; // ejsを読込パターン

const ejsCompile = async path => {
  const ejsContent = await mwEJS(
    path.replace(/^src\//, "/").replace(/\.ejs$/, ".html")
  );
  fs.outputFile(
    path.replace(/^src\//, "dist/").replace(/\.ejs$/, ".html"),
    ejsContent
  );
};

const compileStart = (pattern, func) => {
  globby(pattern).then(files => {
    for (let path of files) func(path);
  });
};

compileStart(ejsFiles, ejsCompile);