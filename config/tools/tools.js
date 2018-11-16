const commander = require("commander");

// module
const glob = require("./glob/glob.js");
const shot = require("./screenshots/shot.js");
const fs = require("./file-system/fs.js");
const imgmin = require("./imgmin/imgmin.js");
const htmlValidate = require("./html-validator/validator.js");

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
    "output_filelist.txt"
  )
  .option("-o --output", "検索結果をファイルに出力する", false)
  .option("-a --absolute", "出力するパスを絶対パスにするオプション", false)
  .action(cmd => {
    glob(cmd);
  });

// shot
commander
  .command("shot")
  .description(
    "input.csvを元にスクリーンショットを撮影します。設定ファイルはconfig.jsonです。(例: npm run tools -- shot)"
  )
  .option("-c --config", "設定ファイルを表示して終了します", false)
  .action(cmd => {
    shot(cmd);
  });

// fs
commander
  .command("fs")
  .description(
    "ファイルリストを元にコピーや削除を行います。(例: npm run tools -- fs)"
  )
  .option("-n --name <name>", "読み込むファイルリストの名前", "output_filelist.txt")
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
  .action(cmd => {
    fs(cmd);
  });

// img-min
commander
  .command("imgmin")
  .description(
    "jpg, png, svg, gif の画像ファイルサイズを圧縮します。(例: npm run tools -- imgmin)"
  )
  .option(
    "-r --root <root>",
    "ファイルの入力元のディレクトリ(例: src/)",
    "src/"
  )
  .option(
    "-o --output <output>",
    "ファイルの出力先のディレクトリ(例: output_imgmin/)",
    "output_imgmin/"
  )
  .action(cmd => {
    imgmin(cmd);
  });

// html-validator
commander
  .command("html-validate")
  .alias("hv")
  .description(
    "HTMLをW3Cに基づきバリデーションチェックします。(例: npm run tools -- hv)"
  )
  .option(
    "-p --pattern <pattern>",
    "ファイルの入力元のディレクトリ ワイルドカードが使えます コンマ(,)で区切ることができます(例: src/**/*.html,!**/includes)",
    "src/**/*.html,!**/includes"
  )
  .action(cmd => {
    htmlValidate(cmd);
  });

commander.usage("[command] [options]").parse(process.argv);
if (process.argv.length <= 2) commander.help();
