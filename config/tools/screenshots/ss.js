var childProcess = require("child_process");
var cwd = process.cwd() + "/";
var paths = [
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/careers/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/",
  "https://www.mitsue.co.jp/",
  "https://www.mitsue.co.jp/service/",
  "https://www.mitsue.co.jp/our_work/",
  "https://www.mitsue.co.jp/knowledge/",
  "https://www.mitsue.co.jp/seminar/",
  "https://www.mitsue.co.jp/news/",
  "https://www.mitsue.co.jp/company/"
];
for (var i = 0; i < paths.length; i++) {
  childProcess.exec(
    '"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --screenshot=' +
      cwd +
      i +
      ".png --window-size=1280,1696 --fullpage " +
      paths[i] +
      "--ignore-certificate-errors --allow-running-insecure-content --disable-web-security --disable-desktop-notifications --disable-extensions --lang=ja"
  );
}
