const fs = require("fs-extra");
const { FuseBox, BabelPlugin, QuantumPlugin } = require("fuse-box");

const cwd = process.cwd().replace(/\\/g, "/") + "/";
const jsDir = "src/assets/js/"; // jsファイルのディレクトリ
const babelOptions = fs.readJsonSync(".babelrc"); // 設定ファイルを読込

const fuse = FuseBox.init({
  homeDir: cwd,
  output: cwd + jsDir + "$name.js",
  useTypescriptCompiler: false,
  plugins: [
    BabelPlugin(babelOptions),
    QuantumPlugin({
      bakeApiIntoBundle: "common_bundle",
      uglify: true
    })
  ]
});

const bundle = fuse
  .bundle("common_bundle")
  .instructions(">" + jsDir + "common.js");

fuse.run();
