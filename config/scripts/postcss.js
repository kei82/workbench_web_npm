const fs = require('fs-extra');
const globby = require('globby');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

const cwd = process.cwd().replace(/\\/g, '/') + '/';
const postcssPlugin = [ // 使用するPostcssプラグイン
  autoprefixer({
    browsers: ['IE 11', 'last 2 versions']
  }),
  mqpacker
];
const scssFolderPath = 'src/assets/sass/'; // scssの場所
const cssFolderPath = 'src/assets/css/'; // cssの場所
const scssFiles = ['src/assets/sass/**/!(_)*.scss']; // scssを読込パターン (scssをpostcss対象にする)
const globOptions = {
  matchBase: true,
  onlyFiles: true,
}

const toCssPath = (path) => {
  return path.replace(scssFolderPath, cssFolderPath).replace(/\.scss$/, '.css');
}

const glob = (pattern, options) => {
  globby(pattern, options)
    .then((files) => {
      files = files
      files.forEach((file) => {
        let cssPath = toCssPath(file);
        postcssStart(cssPath, cssPath);
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
        fs.outputFile(outputFile, result.css);
        console.log('[POSTCSS Completed]');
      });
  });
}

glob(scssFiles, globOptions);
