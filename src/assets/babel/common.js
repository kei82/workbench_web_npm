const prettierStart = data => {
  return prettier.format(data.toString(), prettierOptions);
};

const readFile = file => {
  return fs.readFileSync(file);
};

const writeFile = (outputFile, data) => {
  fs.outputFile(outputFile, data);
};

const promiseStart = (str, func) => {
  return new Promise((resolve, reject) => {
    if (!str && !func) reject("Error");
    else resolve(func(str));
  });
};