const commander = require("commander");

// module
const glob = require("./glob/glob.js");
const shot = require("./screenshots/shot.js");
const fs = require("./file-system/fs.js");

// glob
commander
  .command("glob")
  .description(
    "ワイルドカードでファイルを検索します。(例: npm run tools -- glob -p **/*.js,**/*.css -i node_modules)"
  )
  .option(
    "-p --pattern <pattern>",
    "[必須] ワイルドカードのパターン コンマ(,)で区切ることができます(例: **/*.txt)",
    "*"
  )
  .option(
    "-i --ignore <ignore>",
    "ワイルドカードの除外するパターン コンマ(,)で区切ることができます(例: **/*.html)",
    false
  )
  .option(
    "-r --root <root>",
    "ファイルを探すルートディレクトリ(例: C:/Users/Desktop/)",
    false
  )
  .option(
    "-n --name <name>",
    "出力するファイル名(ファイルが作成されます)",
    "filelist.txt"
  )
  .option("-o --output", "検索結果をファイルに出力する", false)
  .option("-a --absolute", "出力するパスを絶対パスにするオプション", false)
  .action(function(cmd) {
    glob(cmd);
  });

// shot
commander
  .command("shot")
  .description(
    "input.csvファイルを元にスクリーンショットを撮影します。設定ファイルはconfig.jsonです。(例: npm run tools -- shot)"
  )
  .action(function(cmd) {
    shot();
  });

// fs
commander
  .command("fs")
  .description(
    "ファイルリストを元にコピーや削除を行います。(例: npm run tools -- fs)"
  )
  .option("-n --name <name>", "読み込むファイルリストの名前", "filelist.txt")
  .option("-r --root <root>", "ファイルのコピー元のディレクトリ(例: src/)", "")
  .option(
    "-o --output <output>",
    "ファイルのコピー先のディレクトリ(例: output/)",
    "output_fs/"
  )
  .option(
    "-w --work <work>",
    "動作の指定をする copy | delete",
    /^(copy|delete)$/i,
    "copy"
  )
  .action(function(cmd) {
    fs(cmd);
  });

commander.usage("[command] [options]").parse(process.argv);
if (process.argv.length <= 2) commander.help();
