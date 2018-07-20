const fs = require('fs-extra');
const globby = require('globby');
const notifier = require('node-notifier');
const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');

let changeEvent = process.argv[2] === 'change' ? true : false; // 引数 監視イベント
let changePath = process.argv[3] ? process.argv[3].replace(/\\/g, '/') : false; // 引数 監視イベントパス
let isScssInclude = changePath ? /^_.*\.scss$/.test(changePath.split('/').pop()) : false; // scssのインクルードファイルか判定

const scssPath = 'src/assets/sass/'; // scssの読込場所
const cssPath = 'src/assets/css/'; // cssの出力場所
const scssFiles = [scssPath + '**/!(_)*.scss']; // scssを読込パターン
const postcssPlugin = [ // 使用するPostcssプラグイン
  autoprefixer({
    browsers: ['IE 11', 'last 2 versions']
  }),
  mqpacker()
];
const globOptions = {
  matchBase: true,
  onlyFiles: true,
}

const toCssPath = (path) => {
  return path.replace(scssPath, cssPath).replace(/\.scss$/, '.css');
}

const postcssStart = (outputFile, data) => {
  postcss(postcssPlugin)
    .process(data, {
      from: outputFile,
      to: outputFile
    })
    .then(result => {
      fs.outputFile(outputFile, result.css);
      console.log('[POSTCSS Completed]');
    });
}

const sassCompile = (inputFile, outputFile) => {
  sass.render({
    file: inputFile,
    outputStyle: 'expanded'
  }, (err, result) => {
    if (err) {
      notifier.notify({
        'title': 'SASSにエラーがあります',
        'message': err.formatted
      }, (err, res) => {
        setTimeout(() => {
          throw 'SASS Compil Error';
        }, 500);
      });
      console.error(
        '\x1b[41m\x1b[37m',
        'SASSにエラーがあります',
        '\x1b[0m\x1b[31m',
        '\n' + err.formatted,
        '\x1b[0m'
      );
    } else {
      postcssStart(outputFile, result.css);
      console.log('[SASS Compiled]');
    }
  });
}

const glob = (pattern, options = globOptions) => {
  globby(pattern, options)
    .then((files) => {
      files.forEach((path) => {
        sassCompile(path, toCssPath(path));
      });
    });
}

const compileStart = () => {
  glob(scssFiles);
}

if (changeEvent && !isScssInclude) {
  sassCompile(changePath, toCssPath(changePath));
} else {
  compileStart();
}
