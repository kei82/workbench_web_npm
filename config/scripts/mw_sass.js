const fs = require("fs-extra");
const sass = require("node-sass");
const postcss = require("postcss");
const mqpacker = require("css-mqpacker");
const autoprefixer = require("autoprefixer");

module.exports = mwSASS = (requestPath, data, opt) => {
  // cssのパス変換
  let cssPath = opt.baseDir + requestPath;
  // sassのパス変換
  let sassPath =
    opt.baseDir +
    requestPath
      .replace(/css\//, "sass/")
      .replace(new RegExp(`${opt.ext}$`), opt.convert);
  // sass設定
  let sassOptions = {
    data: false,
    includePaths: [sassPath.replace(/\/[^/]*$/, "/")],
    outputStyle: "compressed"
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
  const sassCompile = data => {
    sassOptions.data = data;
    return (data = sass.renderSync(sassOptions));
  };

  // sassかdataがあるとき
  if (fs.pathExistsSync(sassPath) || data) {
    // ファイル読み込み
    const sassData = data ? data : fs.readFileSync(sassPath);
    const sassStr = sassData.toString();
    let sassContent;
    try {
      sassContent = postcssCompile(sassCompile(sassStr).css.toString());
    } catch (err) {
      console.error
      (
        "\x1b[41m\x1b[37m",
        `SASS Compile Error`,
        "\x1b[0m\x1b[31m",
        "\n" + sassPath + " or @import files",
        "\n" + err
      );
      return Buffer.from(`SASS Compile Error\n${err}`);
    }
    return sassContent;
  } else if (fs.pathExistsSync(cssPath)) {
    return fs.readFileSync(cssPath);
  } else {
    return Buffer.from(`Not Found ${cssPath}`);
  }
};
