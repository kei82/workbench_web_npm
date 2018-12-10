const fs = require("fs-extra");
const childProcess = require("child_process");
const notifier = require("node-notifier");
const CLIEngine = require("eslint").CLIEngine;
const eslintOptions = fs.readJsonSync(".eslintrc.json");

const cli = new CLIEngine(eslintOptions);
let gitParams = process.env.HUSKY_GIT_PARAMS
  ? fs.readFileSync(process.env.HUSKY_GIT_PARAMS).toString()
  : "";

const errPrint = result => {
  console.error(`\n${result.filePath}`);
  for (let m of result.messages) {
    let severity =
      m.severity === 2
        ? "\x1b[31m" + "error".padEnd(7) + "\x1b[0m"
        : "\x1b[33m" + "warning".padEnd(7) + "\x1b[0m";
    let position = `${m.line
      .toString()
      .padStart(6)}:${m.column.toString().padEnd(3)}`;
    let err = `${position}  ${severity}  ${m.message}  ${m.ruleId}`;
    console.error(err);
  }
};

const errResult = report => {
  let errSum = report.errorCount + report.warningCount;
  let errNum = [];
  report.errorCount ? errNum.push(report.errorCount + " errors") : false;
  report.warningCount ? errNum.push(report.warningCount + " warnings") : false;
  console.error(
    "\x1b[31m",
    `\n\u274C ${errSum} problems (${errNum.join(", ")})`,
    "\x1b[0m"
  );
  notifier.notify(
    {
      title: "JS Lint Error",
      message: `\u274C ${errSum} problems (${errNum.join(", ")})`
    },
    () => {
      setTimeout(() => {
        throw "JS Lint Error";
      }, 500);
    }
  );
};

const lint = filePaths => {
  const report = cli.executeOnFiles(filePaths);
  if (report.errorCount || report.warningCount) {
    for (let result of report.results) {
      if (result.messages.length) {
        errPrint(result);
      }
    }
    errResult(report);
  } else {
    console.error("\x1b[32m", "\n\u2714 No Error!", "\x1b[0m");
  }
};

const getChangedFile = () => {
  let spawn = childProcess.spawnSync("git", [
    "diff",
    "--diff-filter=ACMR",
    "--staged",
    "--name-only"
  ]).stdout;
  let filePaths = spawn
    .toString()
    .split(/\r\n|\r|\n/)
    .filter(path => /\.js$/.test(path)); // jsを抜き出す
  if (filePaths.length > 0) {
    lint(filePaths);
  }
};

if (!gitParams.match("@例外_JS")) getChangedFile();
