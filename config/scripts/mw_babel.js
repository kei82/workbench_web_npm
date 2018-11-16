const fs = require("fs-extra");
const { FuseBox, BabelPlugin, QuantumPlugin } = require("fuse-box");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const cwd = process.cwd().replace(/\\/g, "/") + "/";
const babelOptions = fs.readJsonSync(".babelrc"); // babel設定ファイルを読込

module.exports = mwBABEL = (requestPath, data, opt) => {
  if (!requestPath) throw requestPath;
  let jsPath = opt.baseDir + requestPath; // jsのパス変換

  if (fs.pathExistsSync(jsPath)) {
    return fs.readFileSync(jsPath);
  } else {
    const babelDir = jsPath
      .replace(/\/[^\/]*$/, "/")
      .replace(/\/js\//g, "/babel/"); // babelファイルのディレクトリ
    const jsDir = jsPath.replace(/\/[^\/]*$/, "/").replace(/^src\//, "dist/"); // jsファイルのディレクトリ
    const babelFilePath = jsPath.replace(/.*\//, "");
    const babelFileName = babelFilePath.replace(/\.[^\.]*$/, "");
    babelOptions.sourceMaps = isProduction ? false : "inline";
    babelOptions.sourceRoot = "../babel";
    babelOptions.sourceFileName = babelFilePath;
    const fuseOptions = {
      homeDir: cwd + babelDir,
      output: "$name.js",
      target: "browser",
      useTypescriptCompiler: false,
      sourceMaps: false,
      writeBundles: false,
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
      return fuse.run().then(producer => {
        for (let [key, obj] of producer.bundles) {
          module.exports.promiseResult = obj.generatedCode;
        }
      });
    };
    return fuseStart(babelFileName, "> " + babelFilePath);
  }
};
