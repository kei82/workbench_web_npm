module.exports = cmd => {
  const fs = require("fs-extra");
  const globby = require("globby");
  const validator = require("html-validator");
  let outputFile = "output_html-validate.md";
  let globOptions = {
    matchBase: true,
    onlyFiles: true
  };
  let errNum = 0;

  const writeValidate = path => {
    return validator({ data: fs.readFileSync(path) })
      .then(data => {
        let result = "";
        let messages = JSON.parse(data).messages;

        if (messages.length) {
          errNum++;
          result += `## ${path}\n\n`;
          for (let e of messages) {
            result += `**[${e.type}] ${path}:${e.lastLine}:${
              e.lastColumn
            }**  \n`;
            result += `* ${e.message}  \n`;
            result += `* \`${e.extract}\`\n\n`;
          }
          fs.appendFileSync(outputFile, result);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const glob = () => {
    globby(cmd.pattern.split(","), globOptions).then(files => {
      for (let path of files) {
        writeValidate(path).then(() => {
          if (files[files.length - 1] === path) {
            if (errNum) {
              console.error(`${errNum} issues!`);
            } else {
              console.log("No issues!");
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
