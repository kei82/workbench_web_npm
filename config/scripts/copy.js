"use strict";
const fs = require("fs-extra");

const rootDir = "src"; // コピー元
const destDir = "dist"; // コピー先

const filterResult = root => {
  let result = true;
  root = root.replace(/\\/g, "/");

  // 除外対象
  switch (true) {
    case fs.statSync(root).isDirectory():
      result = false;
      break;
    case /\.ejs$/.test(root):
      result = false;
      break;
    case /\/babel\/.*\.js$/.test(root):
      result = false;
      break;
    case /\/sass\/.*\.scss$/.test(root):
      result = false;
      break;
  }

  return result;
};

const copyStart = (root = rootDir, dest = destDir) => {
  fs.copySync(root, dest, {
    filter: filterResult
  });
};

const removeStart = (delDir = destDir) => {
  fs.removeSync(delDir);
};

removeStart();
copyStart();
