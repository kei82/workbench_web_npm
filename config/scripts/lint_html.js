const fs = require('fs');
const htmlhint = require('htmlhint').HTMLHint;
const exec = require('child_process').exec;
const notifier = require('node-notifier');

const cwd = process.cwd().replace(/\\/g, '/') + '/';
let inputFiles = process.argv.slice(2); // 引数がある場合は受取る
let errMsg;
const htmlhintOptions = JSON.parse(fs.readFileSync('.htmlhintrc')); // 設定ファイルを読込

const staged = (error, stdout, stderr) => {
  if (error) console.error(error);
  return stdout;
}

const command = (cmd, func) => {
  return new Promise((resolve, reject) => {
    exec(cmd, {
      cwd: cwd
    }, (error, stdout, stderr) => {
      if (func) resolve(func(error, stdout, stderr));
    });
  });
}

const htmlhintStart = (inputData) => {
  let messages = htmlhint.verify(inputData, htmlhintOptions);

  if (messages.length > 0) {
    errMsg = messages[0];
    command(`git reset HEAD ${inputFiles[0]}`);
    notifier.notify({
      'title': 'HTMLにエラーがあります',
      'message': `@${inputFiles[0]} @${errMsg.message}`
    }, (err, res) => {
      setTimeout(() => {
        throw 'HTML Lint Error';
      }, 500);
    });
    console.error(
      '\x1b[41m\x1b[37m',
      `HTMLにエラーがあります`,
      '\x1b[0m\x1b[31m',
      `\n ${inputFiles[0]} \n ${errMsg.message} \n ${errMsg.evidence} \n`,
      '\x1b[0m',
    );
  } else {
    console.log('[HTML Lint Completed]');
  }
}

const lint = (inputFiles) => {
  inputFiles.some((file) => {
    if (errMsg) return true;
    fs.readFile(file, (err, data) => {
      if (err) console.error(err);
      htmlhintStart(data.toString());
    });
  });
}

command('git diff --diff-filter=ACMR --staged --name-only', staged) // Git ステージングされているファイルを読込
  .then((result) => {
    let paths = result.split(/\r\n|\r|\n/);
    paths = paths
      .filter(path => path.length > 3 && /src\/.*\.html$/.test(path));
    if (inputFiles.length < 1) inputFiles = paths;
    lint(inputFiles);
  })
  .catch((err) => {
    console.error(err);
  });
