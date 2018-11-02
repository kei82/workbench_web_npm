const fs = require("fs-extra");
const sass = require("node-sass");
const postcss = require("postcss");
const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");

const isProduction = process.env.NODE_ENV === "production"; // プロダクションビルド判定

module.exports = mwSASS = (requestPath, data, opt) => {
  // cssのパス変換
  let cssPath = opt.baseDir + requestPath;
  // sassのパス変換
  let sassPath =
    opt.baseDir +
    requestPath
      .replace(/css\//, "sass/")
      .replace(new RegExp(`${opt.ext}$`), opt.convert);

  let errorPath;
  // sass設定
  let sassOptions = {
    data: false,
    outputStyle: "compressed",
    sourceMap: !isProduction && sassPath.replace(/\/[^/]*$/, "/"),
    sourceMapEmbed: !isProduction,
    sourceMapContents: !isProduction,
    sourceMapRoot: "../",
    importer: function(url) {
      errorPath = url;
    }
  };
  // 使用するPostcssプラグイン
  const postcssPlugin = [
    mqpacker(),
    autoprefixer({
      browsers: ["IE 11", "last 2 versions"]
    })
  ];

  // postcssコンパイル
  const postcssCompile = data => {
    return postcss(postcssPlugin).process(data, {
      from: cssPath,
      to: cssPath
    }).css;
  };

  // sassコンパイル
  const sassDataCompile = data => {
    sassOptions.data = data;
    sassOptions.includePaths = [sassPath.replace(/\/[^/]*$/, "/")];
    return sass.renderSync(sassOptions);
  };

  const sassPathCompile = path => {
    sassOptions.file = path;
    return sass.renderSync(sassOptions);
  };

  const sassCompileError = err => {
    console.error(
      "\x1b[41m\x1b[37m",
      `SASS Compile Error`,
      "\x1b[0m\x1b[31m",
      "\n" +
        sassPath +
        " OR include file [@import] " +
        sassPath.replace(/\/[^/]*$/, "/") +
        "_" +
        errorPath +
        ".scss",
      "\n" + err
    );
    return Buffer.from(`SASS Compile Error\n${err}`);
  };

  // sassかdataがあるとき
  if (fs.pathExistsSync(sassPath) && !data) {
    // ファイル読み込み
    let sassContent;
    try {
      sassContent = postcssCompile(sassPathCompile(sassPath).css.toString());
    } catch (err) {
      return sassCompileError(err);
    }
    return sassContent;
  } else if (data) {
    // Data読み込み
    const sassStr = data.toString();
    let sassContent;
    try {
      sassContent = postcssCompile(sassDataCompile(sassStr).css.toString());
    } catch (err) {
      return sassCompileError(err);
    }
    return sassContent;
  } else if (fs.pathExistsSync(cssPath)) {
    return fs.readFileSync(cssPath);
  } else {
    return Buffer.from(`Not Found ${cssPath}`);
  }
};
