const fs = require('fs');
const globby = require('globby');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

const postcssPlugin = [ // 使用するPostcssプラグイン
  autoprefixer({
    browsers: ['IE 11', 'last 2 versions']
  }),
  mqpacker
];
const cwd = process.cwd() + '/';
const inputCssPath = 'src/assets/css/'; // cssを読込場所
const outputCssPath = 'src/assets/css/'; // cssを出力場所
const cssFiles = [outputCssPath + '**/*.css']; // cssを読込パターン
const globOptions = {
  matchBase: true,
  onlyFiles: true,
}

const glob = (pattern, options) => {
  globby(pattern, options)
    .then((files) => {
      files.forEach((file) => {
        fileName = file.replace(/\\/g, '/').split('/').pop();
        postcssStart(cwd + inputCssPath + fileName, cwd + outputCssPath + fileName);
      });
    });
}

const postcssStart = (inputFile, outputFile) => {
  fs.readFile(inputFile, (err, data) => {
    if (err) console.error(err);
    postcss(postcssPlugin)
      .process(data, {
        from: inputFile,
        to: outputFile
      })
      .then(result => {
        fs.writeFile(outputFile, result.css, () => true);
      });
  });
}

glob(cssFiles, globOptions);
