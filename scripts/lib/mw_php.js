"use strict";
module.exports = requestPath => {
  const fs = require("fs-extra");
  const childProcess = require("child_process");

  let phpPath = "src" + requestPath; // phpのパス変換

  // phpかdataがあるとき
  if (fs.pathExistsSync(phpPath)) {
    // phpコンパイル
    let phpContent = childProcess.spawnSync("php", [phpPath]).stdout;
    phpContent = Promise.resolve(phpContent);

    return phpContent;
  }
};
