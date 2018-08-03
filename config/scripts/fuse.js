const fs = require("fs-extra");
const { FuseBox, BabelPlugin, QuantumPlugin } = require("fuse-box");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const hasRootDir = !isProduction ? "src" : "dist"; // 出力先
const cwd = process.cwd().replace(/\\/g, "/") + "/";
const babelDir = "src/assets/babel/"; // babelファイルのディレクトリ
const jsDir = "dist/assets/js/"; // jsファイルのディレクトリ
const babelOptions = fs.readJsonSync(".babelrc"); // babel設定ファイルを読込
const fuseOptions = {
  homeDir: cwd + babelDir,
  output: cwd + jsDir + "$name.js",
  target: "browser",
  useTypescriptCompiler: false,
  plugins: [
    BabelPlugin(babelOptions),
    QuantumPlugin({
      bakeApiIntoBundle: true,
      uglify: isProduction,
      treeshake: isProduction
    })
  ]
};

const fuseStart = (outputName, inputFile) => {
  const fuse = FuseBox.init(fuseOptions);
  const fuseSet = fuse.bundle(outputName).instructions(inputFile);
  if (!isProduction) fuseSet.watch();
  fuse.run();
};

fuseStart("common", "> common.js");
