const commander = require("commander");

const glob = require("./glob/glob.js");
const shot = require("./screenshots/shot.js");

commander
  .command("glob")
  .description(
    'ワイルドカードでファイルを検索します。(例: node tools.js glob --pattern "**/*.js" --ignore "node_modules")'
  )
  .option(
    "-p --pattern <pattern>",
    '[必須] ワイルドカードのパターン(例: "**/*.txt")',
    "*"
  )
  .option(
    "-i --ignore <ignore>",
    'ワイルドカードの除外するパターン(例: "**/*.html")',
    false
  )
  .option(
    "-r --root <root>",
    'ファイルを探すルートディレクトリ(例: "C:/Users/Desktop/")',
    false
  )
  .option(
    "-n --name <name>",
    "出力するファイル名(ファイルが作成されます)",
    false
  )
  .option("-a --absolute", "出力するパスを絶対パスにするオプション", false)
  .action(function(cmd) {
    glob(cmd);
  });

commander
  .command("shot")
  .description(
    "CSVファイルをもとにスクリーンショットを撮影します。設定ファイルはconfig.jsonです。"
  )
  .action(function(cmd) {
    shot();
  });

commander.parse(process.argv);
