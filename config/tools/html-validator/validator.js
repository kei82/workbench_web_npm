const fs = require("fs-extra");
const globby = require("globby");
const validate = require("html5-validator");
let globOptions = {
  matchBase: true,
  onlyFiles: true
};
let outputFile = "output_html-validator.md";

const writeValidate = path => {
  validate(path).then(result => {
    if (result.messages.length > 0) {
      var errText = "";
      errText += `## ${path}\n\n`;
      for (let err of result.messages) {
        errText += `* [${err.type}] ${path}:${err.lastLine}:${
          err.firstColumn
        }  \n`;
        errText += `|| \`${err.message}\`  \n`;
        errText += `|| \`${err.extract.replace(/\n/g, "")}\`\n\n`;
      }
      fs.appendFileSync(outputFile, errText);
    }
  });
};

const glob = () => {
  globby(["src/**/*.html", "!**/includes"], globOptions).then(files => {
    for (let path of files) {
      writeValidate(path);
    }
  });
};

const outputValidate = () => {
  fs.outputFileSync(outputFile, "# html-validator\n\n");
  glob();
};

outputValidate();
