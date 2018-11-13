const fs = require("fs-extra");
const globby = require("globby");

module.exports = globFile = cmd => {
  let globOptions = {
    matchBase: true,
    onlyFiles: true
  };
  if (cmd.root) globOptions.cwd = cmd.root;
  if (cmd.ignore) globOptions.ignore = cmd.ignore.split(",");
  if (cmd.absolute) globOptions.absolute = true;

  globby(cmd.pattern.split(","), globOptions).then(files => {
    let toString = "";
    files.forEach(file => {
      if (!cmd.absolute && cmd.root) file = file.replace(cmd.root, "");
      toString += file + "\n";
    });
    console.log("\x1b[36m%s", toString, "\x1b[0m");
    if (cmd.output) fs.outputFileSync(cmd.name, toString);
  });
};
