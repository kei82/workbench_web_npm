const fs = require("fs-extra");
const globby = require("globby");

module.exports = globFile = cmd => {
  let pattern = cmd.pattern;
  let ignore = cmd.ignore;
  let root = cmd.root;
  let fileName = cmd.name;
  let absolutePath = cmd.absolute;
  let globOptions = {
    matchBase: true,
    onlyFiles: true
  };
  if (root) globOptions.cwd = root;
  if (ignore) {
    globOptions.ignore = [];
    globOptions.ignore.push(ignore);
  }
  if (absolutePath) globOptions.absolute = true;

  globby(pattern, globOptions).then(files => {
    let fileArray = [];
    let toString = "";
    files.forEach(file => {
      if (!absolutePath && root) file = file.replace(root, "");
      fileArray.push(file);
      toString += file + "\n";
    });
    console.log("\x1b[36m%s", toString, "\x1b[0m");
    if (fileName) fs.outputFileSync(fileName, toString);
  });
};
