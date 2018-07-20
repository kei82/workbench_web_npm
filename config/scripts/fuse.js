const fs = require('fs-extra');
const {FuseBox, BabelPlugin, QuantumPlugin} = require('fuse-box');

let fuse = FuseBox.init({
  homeDir: './',
  output: './$name.js',
  useTypescriptCompiler: false,
  plugins: [
    BabelPlugin(JSON.parse(fs.readFileSync('.babelrc'))),
    QuantumPlugin({
      bakeApiIntoBundle: 'bundle',
      treeshake: true,
      uglify: true,
    })
  ]
});

fuse
  .bundle('bundle')
  .instructions('> src/assets/js/common.js');

fuse.run();
