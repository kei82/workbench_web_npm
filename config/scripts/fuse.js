const fs = require('fs-extra');
const {FuseBox, BabelPlugin, QuantumPlugin} = require('fuse-box');

const cwd = process.cwd().replace(/\\/g, '/') + '/';
const jsDir = 'src/assets/js/'; // jsファイルのディレクトリ
const babelOptions = JSON.parse(fs.readFileSync('.babelrc')); // 設定ファイルを読込

let fuse = FuseBox.init({
  homeDir: cwd,
  output: cwd + jsDir + '$name.js',
  useTypescriptCompiler: false,
  plugins: [
    BabelPlugin(babelOptions),
    QuantumPlugin({
      bakeApiIntoBundle: 'bundle',
      uglify: true,
    })
  ]
});

fuse.bundle('bundle').instructions('> ' + jsDir + 'common.js');

fuse.run();
