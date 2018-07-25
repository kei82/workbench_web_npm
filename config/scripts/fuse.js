const fs = require("fs-extra");
const { FuseBox, BabelPlugin, QuantumPlugin } = require("fuse-box");

const isProduction = process.env.NODE_ENV === "production" ? true : false; // プロダクションビルド判定
const isOutput = !isProduction ? "src" : "dist"; // 出力先
const cwd = process.cwd().replace(/\\/g, "/") + "/";
const babelDir = "src/assets/babel/"; // babelファイルのディレクトリ
const jsDir = isOutput + "/assets/js/"; // jsファイルのディレクトリ
const babelOptions = fs.readJsonSync(".babelrc"); // 設定ファイルを読込

const fuse = FuseBox.init({
  homeDir: cwd + babelDir,
  output: cwd + jsDir + "$name.js",
  useTypescriptCompiler: false,
  plugins: [
    BabelPlugin(babelOptions),
    QuantumPlugin({
      bakeApiIntoBundle: "common",
      uglify: true
    })
  ]
});

const fuseSet = fuse.bundle("common").instructions("> common.js");
if (!isProduction) fuseSet.hmr().watch();

fuse.run();
