const fs = require("fs-extra");
const childProcess = require("child_process");
const csvParse = require("csv-parse/lib/sync");

const cwdPath = __dirname + "/";
let conf;
let csvParseOptions = {
  columns: true,
  skip_empty_lines: true
};

// 細分化して子プロセスで実行
const processRepeat = confPage => {
  let subdividePage = confPage.reduce(
    (table, item) => {
      const last = table[table.length - 1];
      if (last.length === 3) {
        table.push([item]);
        return table;
      }
      last.push(item);
      return table;
    },
    [[]]
  );

  for (let pack of subdividePage) {
    conf.page = pack;
    jsonStr = JSON.stringify(conf).replace(/"/g, '\\"');
    let cmd = "node " + cwdPath + "shot.js " + "`" + jsonStr + "`";

    childProcess.exec(cmd, (error, stdout, stderr) => {
      if (error) throw error;
      console.log(stdout);
    });
  }
};

const processStart = confFile => {
  conf = fs.readJsonSync(cwdPath + confFile); // 設定ファイル読み込み
  conf.page = csvParse(
    fs.readFileSync(cwdPath + conf.input_csv),
    csvParseOptions
  ); // CSVファイル読み込み
  fs.mkdirsSync(cwdPath + conf.output_folder); // 出力フォルダ作成
  processRepeat(conf.page); // 撮影
};

processStart("config.json");
