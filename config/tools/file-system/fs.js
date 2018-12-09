module.exports = cmd => {
  const fs = require("fs-extra");

  let fileList = fs
    .readFileSync(cmd.name)
    .toString()
    .split("\n")
    .filter(file => {
      return file.length > 0;
    });

  if (cmd.work === "copy") {
    for (let file of fileList) {
      fs.copy(cmd.root + file, cmd.output + file, err => {
        if (err) throw err;
      });
    }
  }
  if (cmd.work === "delete") {
    for (let file of fileList) {
      fs.remove(cmd.root + file, err => {
        if (err) throw err;
      });
    }
  }
};
