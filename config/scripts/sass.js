const fs = require('fs-extra');
const notifier = require('node-notifier');
const sass = require('node-sass');
const globby = require('globby');

const scssPath = 'src/assets/sass/'; // scssの読込場所
const cssPath = 'src/assets/css/'; // cssの出力場所
const scssFiles = [scssPath + '**/!(_)*.scss']; // scssを読込パターン
const globOptions = {
  matchBase: true,
  onlyFiles: true,
}

const toCssPath = (path) => {
  return path.replace(scssPath, cssPath).replace(/\.scss$/, '.css');
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
      fs.outputFile(outputFile, result.css);
      console.log('[SASS Compiled]');
    }
  });
}

const glob = (pattern, options) => {
  globby(pattern, options)
    .then((files) => {
      files.forEach((path) => {
        sassCompile(path, toCssPath(path));
      });
    });
}

const compileStart = () => {
  glob(scssFiles, globOptions);
}

compileStart();
