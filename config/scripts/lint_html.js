const fs = require("fs-extra");
const childProcess = require("child_process");
const htmlhint = require("htmlhint").HTMLHint;
const notifier = require("node-notifier");

let errMsg;
let htmlhintOptions = fs.readJsonSync(".htmlhintrc"); // 設定ファイルを読込
let gitParams = process.env.HUSKY_GIT_PARAMS
  ? fs.readFileSync(process.env.HUSKY_GIT_PARAMS).toString()
  : "";

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

const lint = inputFile => {
  let inputData = fs.readFileSync(inputFile).toString();
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

let spawn = childProcess.spawnSync("git", [
  "diff",
  "--diff-filter=ACMR",
  "--staged",
  "--name-only"
]);
spawn.stdout.on("data", function(data) {
  console.log(data.toString());
  lint(data.toString());
});

if (gitParams.match("【例外HTML】")) {
  throw "NG file";
}
