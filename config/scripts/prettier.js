const fs = require("fs-extra");
const prettier = require("prettier");

let prettierOptions = fs.readJsonSync(".prettierrc");
let inputFiles = process.argv[2] || false;
if (!inputFiles) throw "Please set up the file";

const prettierStart = data => {
  return prettier.format(data.toString(), prettierOptions);
};

const readFile = file => {
  return fs.readFileSync(file);
};

const outputFile = (outputFile, data) => {
  fs.outputFile(outputFile, data);
};

const promiseStart = (str, func) => {
  return new Promise((resolve, reject) => {
    if (!str && !func) reject("Error");
    else resolve(func(str));
  });
};

promiseStart(inputFiles, readFile)
  .then(result => {
    return prettierStart(result);
  })
  .then(result => {
    outputFile(inputFiles, result);
  })
  .catch(err => {
    console.error(err);
  });
