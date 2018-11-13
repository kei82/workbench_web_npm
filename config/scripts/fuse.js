const fs = require("fs-extra");
const { FuseBox, BabelPlugin, QuantumPlugin } = require("fuse-box");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const cwd = process.cwd().replace(/\\/g, "/") + "/";
const babelDir = "src/assets/babel/"; // babelファイルのディレクトリ
const jsDir = "dist/assets/js/"; // jsファイルのディレクトリ
const babelFileName = "common";
const babelOptions = fs.readJsonSync(".babelrc"); // babel設定ファイルを読込
babelOptions.sourceMaps = isProduction ? false : "inline";
babelOptions.sourceRoot = "../babel";
babelOptions.sourceFileName = babelFileName + ".js";
const fuseOptions = {
  homeDir: cwd + babelDir,
  output: cwd + jsDir + "$name.js",
  target: "browser",
  useTypescriptCompiler: false,
  sourceMaps: false,
  plugins: [
    BabelPlugin(babelOptions),
    isProduction &&
      QuantumPlugin({
        bakeApiIntoBundle: true,
        treeshake: true,
        uglify: true
      })
  ]
};

const fuseStart = (outputName, inputFile) => {
  const fuse = FuseBox.init(fuseOptions);
  const fuseSet = fuse.bundle(outputName).instructions(inputFile);
  if (!isProduction) fuseSet.watch();
  fuse.run();
};

fuseStart(babelFileName, "> " + babelFileName + ".js");
