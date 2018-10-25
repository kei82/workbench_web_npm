const fs = require('fs');
const globby = require('globby');
const commander = require('commander');

const globFile = (cmder) => {
  let pattern = cmder.pattern;
  let ignore = cmder.ignore;
  let root = cmder.root;
  let fileName = cmder.name;
  let absolutePath = cmder.absolute;
  let globOptions = {
    matchBase: true,
    onlyFiles: true,
  };
  if (root) globOptions.cwd = root;
  if (ignore) { globOptions.ignore = []; globOptions.ignore.push(ignore); }
  if (absolutePath) globOptions.absolute = true;

  globby(pattern, globOptions)
    .then((files) => {
      let fileArray = [];
      let toString = '';
      files.forEach(file => {
        if (!absolutePath && root) file = file.replace(root, '')
        fileArray.push(file);
        toString += file + '\n';
      });
      console.log(
        '\x1b[36m%s',
        toString
      );
      if (fileName) fs.writeFile(fileName, toString, () => true);
    });
}

commander
  .command('glob')
  .description('ワイルドカードでファイルを検索します')
  .option('-p --pattern <pattern>', '[必須] ワイルドカードのパターン(例: "**/*.txt")', false)
  .option('-i --ignore <ignore>', 'ワイルドカードの除外するパターン(例: "**/*.html")', false)
  .option('-r --root <root>', 'ファイルを探すルートディレクトリ(例: "C:/Users/Desktop/")', false)
  .option('-n --name <name>', '出力するファイル名(ファイルが作成されます)', false)
  .option('-a --absolute', '出力するパスを絶対パスにするオプション', false)
  .action(function (cmd) {
    globFile(cmd);
  });

commander.parse(process.argv);