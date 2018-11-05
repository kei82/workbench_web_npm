const fs = require("fs-extra");
const { FuseBox, BabelPlugin, QuantumPlugin } = require("fuse-box");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const cwd = process.cwd().replace(/\\/g, "/") + "/";

module.exports = mwJS = (requestPath, data, opt) => {
  // jsのパス変換
  let jsPath = opt.baseDir + requestPath;
  // babelのパス変換
  let babelPath = jsPath.replace(/\/js\//, "/babel/");

  if (!fs.pathExistsSync(babelPath)) return fs.readFileSync(jsPath); // babelがあるときのみ動作

  const babelDir = "src/assets/babel/"; // babelのディレクトリ
  const jsDir = "dist/assets/js/"; // jsのディレクトリ
  const jsFileNamePath = requestPath.replace(/.*\//, "");
  const jsFileName = jsFileNamePath.replace(/\.[^\.]*$/, "");
  const babelOptions = fs.readJsonSync(".babelrc"); // babel設定を読込
  const fuseOptions = {
    homeDir: cwd + babelDir,
    output: cwd + jsDir + "$name.js",
    writeBundles: isProduction,
    target: "browser",
    useTypescriptCompiler: false,
    plugins: [
      BabelPlugin(babelOptions),
      QuantumPlugin({
        bakeApiIntoBundle: true,
        treeshake: isProduction,
        uglify: isProduction
      })
    ]
  };

  const fuse = FuseBox.init(fuseOptions);
  const fuseSet = fuse.bundle(jsFileName).instructions("> " + jsFileNamePath);

  let jsContent;
  try {
    fuse.run().then(producer => {
      producer.bundles.forEach(bundle => {
        bundle.generatedCode;
      });
    });
  } catch (err) {
    return err;
  }
  return jsContent;
};
