"use strict";
const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Promise Buffer]
const mwEJS = require("./lib/mw_ejs");

const ejsCompile = async path => {
  const ejsContent = await mwEJS(
    path.replace(/^src\//, "/").replace(/\.ejs$/, ".html")
  );
  fs.outputFile(
    path.replace(/^src\//, "dist/").replace(/\.ejs$/, ".html"),
    ejsContent
  );
};

const compileStart = async (pattern, func) => {
  const files = await globby(pattern);
  for (let path of files) func(path);
};

compileStart(["src/**/!(_)*.ejs"], ejsCompile);
