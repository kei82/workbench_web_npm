module.exports = htmlValidate = cmd => {
  const fs = require("fs-extra");
  const globby = require("globby");
  const validate = require("html5-validator");

  let globOptions = {
    matchBase: true,
    onlyFiles: true
  };
  let outputFile = "output_html-validate.md";
  let errNum = 0;

  const writeValidate = path => {
    return validate(path).then(result => {
      if (result.messages.length > 0) {
        errNum += 1;
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
    globby(cmd.pattern.split(","), globOptions).then(files => {
      for (let path of files) {
        writeValidate(path).then(() => {
          if (files[files.length - 1] === path) {
            if (errNum == 0) {
              fs.appendFileSync(outputFile, "No issues!");
              console.log("No issues!");
            } else {
              console.error("\x1b[41m\x1b[37m", `${errNum} issues`, "\x1b[0m");
            }
          }
        });
      }
    });
  };

  const outputValidate = () => {
    fs.outputFileSync(outputFile, `# html-validator\n\n`);
    glob();
  };

  outputValidate();
};
