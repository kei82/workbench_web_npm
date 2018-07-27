const fs = require("fs-extra");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const rootDir = "src"; // コピー元
const destDir = "dist"; // コピー先

const filterResult = root => {
  let result = true;
  root = root.replace(/\\/g, "/");

  // 除外対象
  switch (true) {
    case /.*\.ejs$/.test(root):
      result = false;
      break;
    case /.*assets\/babel.*/.test(root):
      result = false;
      break;
    case /.*assets\/sass.*/.test(root):
      result = false;
      break;
  }

  if (!result) console.log("[EXCLUDE]", root);
  return result;
};

copyStart = (root = rootDir, dest = destDir) => {
  fs.copy(root, dest, {
    filter: filterResult
  });
};

if (isProduction) copyStart();
