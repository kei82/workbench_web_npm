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
const processRepeat = async pages => {
  for (let width of conf.viewport) {
    for (let page of pages) {
      let cmd = `node ${cwdPath}shot.js ${width} "${page["ページURL"]}" ${
        page["ファイル名"]
      }`;

      let set = await childProcess.exec(cmd, (error, stdout) => {
        if (error) throw error;
        console.log(stdout);
      });
    }
  }
};

const processStart = (confFile = "config.json") => {
  conf = fs.readJsonSync(cwdPath + confFile); // 設定ファイル読み込み
  let pages = csvParse(
    fs.readFileSync(cwdPath + conf.input_csv),
    csvParseOptions
  ); // CSVファイル読み込み
  fs.mkdirsSync(cwdPath + conf.output_folder); // 出力フォルダ作成
  processRepeat(pages); // 撮影
};

processStart();
