"use strict";
const fs = require("fs-extra");
const globby = require("globby");

// ミドルウェア [return Promise Buffer]
const mwEJS = require("./lib/mw_ejs");

const ejsOutput = (path, content) => {
  let outputPath = path.replace(/^src\//, "dist/").replace(/\.ejs$/, ".html");
  fs.outputFile(outputPath, content);
};

const ejsCompile = async path => {
  let htmlPath = path.replace(/^src\//, "/").replace(/\.ejs$/, ".html");
  return await mwEJS(htmlPath);
};

const compileStart = async (pattern, func, output) => {
  let files = await globby(pattern);
  for (let path of files) {
    let content = await func(path);
    if (output) output(path, content);
  }
};

compileStart(["src/**/!(_)*.ejs"], ejsCompile, ejsOutput);
