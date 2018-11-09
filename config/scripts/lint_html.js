const fs = require("fs-extra");
const exec = require("child_process").exec;
const htmlhint = require("htmlhint").HTMLHint;
const notifier = require("node-notifier");

console.log(process.env);

let inputFiles = process.argv.slice(2) || []; // 引数がある場合は受取る
let errMsg;
const htmlhintOptions = fs.readJsonSync(".htmlhintrc"); // 設定ファイルを読込

const outStr = (error, stdout, stderr) => {
  if (error) throw error;
  else return stdout;
};

const command = (cmd, func) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error);
      else if (func) resolve(func(error, stdout, stderr));
    });
  });
};

const htmlhintStart = inputData => {
  let messages = htmlhint.verify(inputData, htmlhintOptions);

  if (messages.length > 0) {
    errMsg = messages[0];
    command(`git reset HEAD ${inputFiles[0]}`);
    let notifyMessage = {
      title: "HTML Lint Error",
      message: `@${inputFiles[0]} @${errMsg.message}`
    };
    notifier.notify(notifyMessage, (err, res) => {
      setTimeout(() => {
        throw "HTML Lint Error";
      }, 500);
    });
    console.error(
      "\x1b[41m\x1b[37m",
      "HTML Lint Error",
      "\x1b[0m\x1b[31m",
      `\n ${inputFiles[0]} \n ${errMsg.message} \n ${errMsg.evidence} \n`,
      "\x1b[0m"
    );
  }
};

const lint = inputFiles => {
  inputFiles.some(file => {
    if (errMsg) return true;
    fs.readFile(file, (err, data) => {
      if (err) console.error(err);
      else htmlhintStart(data.toString());
    });
  });
};

command("git diff --diff-filter=ACMR --staged --name-only", outStr) // Git ステージングされているファイルを読込
  .then(result => {
    let paths = result.split(/\r\n|\r|\n/);
    paths = paths.filter(path => /^src\/.*\.html$/.test(path)); // srcフォルダ内のhtmlを抜き出す
    if (inputFiles.length < 1) {
      inputFiles = paths;
      lint(inputFiles);
    } else if (inputFiles[1] !== "unlink") {
      lint([inputFiles[0]]);
    }
  })
  .catch(err => {
    throw err;
  });
