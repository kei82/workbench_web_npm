"use strict";
const fs = require("fs-extra");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const rootDir = "src"; // コピー元
const destDir = "dist"; // コピー先

const filterResult = root => {
  let result = true;
  root = root.replace(/\\/g, "/");

  // 除外対象
  switch (true) {
    case /\.ejs$/.test(root):
      result = false;
      break;
    case /(\/babel$|\/babel\/.*\.js$)/.test(root):
      result = false;
      break;
    case /(\/sass$|\/sass\/.*\.scss$)/.test(root):
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

if (isProduction) {
  removeStart();
  copyStart();
} else {
  removeStart();
}
