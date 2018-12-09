const fs = require("fs-extra");
const CLIEngine = require("eslint").CLIEngine;
const eslintOptions = fs.readJsonSync(".eslintrc.json");

const cli = new CLIEngine(eslintOptions);

const report = cli.executeOnFiles(["config/", "src/**/[!jquery.min.js]*.js"]);

for (let result of report.results) {
  if (result.messages.length) {
    console.error(`\n${result.filePath}`);
    for (let m of result.messages) {
      let severity =
        m.severity === 2
          ? "\x1b[31m" + "error".padEnd(7) + "\x1b[0m"
          : "\x1b[33m" + "warning".padEnd(7) + "\x1b[0m";
      let position = `${m.line
        .toString()
        .padStart(6)}:${m.column.toString().padEnd(3)}`;
      let err = `${position}  ${severity}  ${m.message}  ${m.message}  ${m.ruleId}`;
      console.error(err);
    }
  }
}

if (report.errorCount || report.warningCount) {
  let errSum = report.errorCount + report.warningCount;
  let errNum = [];
  report.errorCount ? errNum.push(report.errorCount + "errors") : false;
  report.warningCount ? errNum.push(report.warningCount + "warnings") : false;
  console.error(
    "\x1b[31m",
    `\n✖ ${errSum} problems (${errNum.join(", ")})`,
    "\x1b[0m"
  );
} else {
  console.error("\x1b[32m", "\nNo Error!", "\x1b[0m");
}
