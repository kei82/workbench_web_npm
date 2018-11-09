const fs = require("fs-extra");
const childProcess = require("child_process");
const htmlhint = require("htmlhint").HTMLHint;
const notifier = require("node-notifier");

let htmlhintOptions = fs.readJsonSync(".htmlhintrc"); // 設定ファイルを読込
let gitParams = process.env.HUSKY_GIT_PARAMS
  ? fs.readFileSync(process.env.HUSKY_GIT_PARAMS).toString()
  : "";

const lint = inputFile => {
  console.log(inputFile);

  let inputData = fs.readFileSync(inputFile).toString();
  let messages = htmlhint.verify(inputData, htmlhintOptions);
console.log(messages);

  if (messages.length > 0) {
    let errTitle = "HTML Lint Error";
    let errMsg = `${inputFile}\n${messages[0].message}\n${
      messages[0].evidence
    }`;

    childProcess.spawn("git", ["reset", "HEAD", inputFile]);
    notifier.notify(
      {
        title: errTitle,
        message: errMsg.replace(/\n/g, " | ")
      },
      () => {
        setTimeout(() => {
          throw errTitle;
        }, 500);
      }
    );
    console.error(
      "\x1b[41m\x1b[37m",
      errTitle,
      "\x1b[0m\x1b[31m",
      `\n${errMsg}\n`,
      "\x1b[0m"
    );
  }
};

const getChangedFile = () => {
  let spawn = childProcess.spawn("git", [
    "diff",
    "--diff-filter=ACMR",
    "--staged",
    "--name-only"
  ]);

  console.log("★★★");
  spawn.stdout.on("data", function(data) {
    let filePath = data.toString();
    if (filePath.match(/\.html$/)) {
      console.log("★");lint(filePath)};
  });
};

if (!gitParams.match("【例外HTML】")) getChangedFile();
