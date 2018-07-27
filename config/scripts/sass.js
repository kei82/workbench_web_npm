const fs = require("fs-extra");
const globby = require("globby");
const chokidar = require("chokidar");
const notifier = require("node-notifier");
const sass = require("node-sass");
const postcss = require("postcss");
const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定
const scssPath = "src/assets/sass/"; // scssの読込場所
const cssPath = !isProduction ? "src/assets/css/" : "dist/assets/css/"; // cssの出力場所
const scssFiles = [scssPath + "**/!(_)*.scss"]; // scssを読込パターン
let sassOptions = {
  file: false,
  outputStyle: "compressed"
};
let globOptions = {
  matchBase: true,
  onlyFiles: true
};

// 使用するPostcssプラグイン
const postcssPlugin = [
  mqpacker(),
  autoprefixer({
    browsers: ["IE 11", "last 2 versions"]
  })
];

// scssのパス変換
const toCssPath = path => {
  return path.replace(scssPath, cssPath).replace(/\.scss$/, ".css");
};

// インクルード用scss判定
const isScssInclude = path => {
  return /^_.*\.scss$/.test(path.split("/").pop());
};

// postcssコンパイル
const postcssStart = (outputFile, data) => {
  postcss(postcssPlugin)
    .process(data, {
      from: outputFile,
      to: outputFile
    })
    .then(result => {
      fs.outputFile(outputFile, result.css);
    });
};

// scssコンパイル
const sassCompile = (inputFile, outputFile) => {
  sassOptions.file = inputFile;
  sass.render(sassOptions, (err, result) => {
    if (err) {
      let notifyMessage = {
        title: "SASSにエラーがあります",
        message: err.formatted
      };
      notifier.notify(notifyMessage);
      console.error(
        "\x1b[41m\x1b[37m",
        "SASSにエラーがあります",
        "\x1b[0m\x1b[31m",
        "\n" + err.formatted,
        "\x1b[0m"
      );
    } else {
      postcssStart(outputFile, result.css);
    }
  });
};

// ファイルの取得
const glob = (pattern, options = globOptions) => {
  globby(pattern, options).then(files => {
    files.forEach(path => {
      sassCompile(path, toCssPath(path));
    });
  });
};

const compileStart = () => {
  glob(scssFiles);
};

if (!isProduction) {
  // scssファイルを監視
  let watcher = chokidar.watch(scssPath, {
    awaitWriteFinish: {
      stabilityThreshold: 500
    }
  });
  watcher.on("all", (event, path) => {
    path = path.replace(/\\/g, "/");
    if (event === "change" && !isScssInclude(path))
      sassCompile(path, toCssPath(path));
    else if (event === "unlink" && !isScssInclude(path))
      fs.removeSync(toCssPath(path));
    else compileStart();
  });
} else {
  compileStart();
}
