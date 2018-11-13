const fs = require("fs-extra");
const globby = require("globby");
const validate = require("html5-validator");
let globOptions = {
  matchBase: true,
  onlyFiles: true
};
let errText;

const writeValidate = path => {
  validate(path).then(result => {
    if (result.messages.length > 0) {
      errText += "# " + path + "\n\n";
      for (let err of result.messages)
        errText +=
          "* [" +
          err.type +
          "] " +
          path +
          ":" +
          err.lastLine +
          ":" +
          err.firstColumn +
          "  \n" +
          err.message +
          "\n```html\n" +
          err.extract +
          "\n```\n";
      console.log(errText);
    }
  });
};

globby(["src/**/*.html"], globOptions).then(files => {
  files.forEach(path => {
    writeValidate(path);
  });
});
