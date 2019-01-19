const globby = require("globby");

module.exports = async () => {
  // エントリーポイント作成
  let entryPoint = {};
  const addEntryPoint = async (patterns, replaceFunc) => {
    let entryFiles = await globby(patterns);
    for (let path of entryFiles) {
      let accessPath = replaceFunc(path)
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
