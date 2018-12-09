const fs = require("fs-extra");
const CLIEngine = require("eslint").CLIEngine;
const eslintOptions = fs.readJsonSync(".htmlhintrc");

const cli = new CLIEngine(eslintOptions);

const report = cli.executeOnFiles(["config/"]);
console.log(report);
