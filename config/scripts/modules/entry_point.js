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
  const replacePathBabel = path => {
    return path.replace("/babel/", "/js/");
  };
  await addEntryPoint(["src/**/babel/**/!(_)*.js"], replacePathBabel);

  // sassをエントリーポイントに追加
  const replacePathSass = path => {
    return path.replace("/sass/", "/css/");
  };
  await addEntryPoint(["src/**/sass/**/!(_)*.scss"], replacePathSass);

  return entryPoint;
};
