"use strict";
module.exports = async () => {
  const globby = require("globby");

  // エントリーポイント作成
  let entryPoint = {};
  const addEntryPoint = async (patterns, replacePath) => {
    let entryFiles = await globby(patterns);
    for (let path of entryFiles) {
      let accessPath = replacePath(path)
        .replace(/^src\//, "")
        .replace(/\.[^.]*$/, "");
      entryPoint[accessPath] = "./" + path;
    }
  };

  // babelをエントリーポイントに追加
  await addEntryPoint(["src/**/babel/**/!(_)*.js"], path => {
    return path.replace("/babel/", "/js/");
  });

  // sassをエントリーポイントに追加
  await addEntryPoint(["src/**/sass/**/!(_)*.scss"], path => {
    return path.replace("/sass/", "/css/");
  });

  return entryPoint;
};
