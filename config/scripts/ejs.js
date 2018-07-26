const fs = require("fs-extra");
const globby = require("globby");
const ejs = require("ejs");

const isProduction = process.env.NODE_ENV === "production" ? true : false; // プロダクションビルド判定
const rootDir = "src"; // 入力元
const distDir = "dist"; // 出力先
const inExt = ".ejs";
const outExt = ".html";
const ejsFiles = [rootDir + "/**/*" + inExt]; // ejsを読込パターン
let globOptions = {
  matchBase: true,
  onlyFiles: true
};

const ejsCompile = path => {
  let readFile = fs.readFileSync(path);
  let ejsContent = ejs.render(readFile.toString());
  let outputPath = path
    .replace(new RegExp(`^${rootDir}\/`), `${distDir}/`)
    .replace(new RegExp(`${inExt}$`), outExt);
  fs.outputFile(outputPath, ejsContent);
};

const glob = (pattern, options = globOptions) => {
  globby(pattern, options).then(files => {
    files.forEach(path => {
      ejsCompile(path);
    });
  });
};

const compileStart = () => {
  glob(ejsFiles);
};

if (isProduction) compileStart();
