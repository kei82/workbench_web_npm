const fs = require("fs-extra");

const isProduction = process.env.NODE_ENV === "production" ? true : false; // プロダクションビルド判定
rootDir = "src";
destDir = "dest";

const filter = path => {
  return path.indexOf(".ejs") > -1; //途中
};

copyStart = () => {
  fs.copy(rootDir, destDir, {
    filter: filter(path)
  });
};

if (isProduction) copyStart();
