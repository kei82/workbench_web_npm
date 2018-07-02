const notifier = require('node-notifier');

let title = process.argv[2]; // 引数1をtitleに設定
let message = process.argv[3]; // 引数2をmessageに設定
if (title === undefined) title = 'Error';
if (message === undefined) message = 'Error';

notifier.notify({
  'title': title,
  'message': message
});
