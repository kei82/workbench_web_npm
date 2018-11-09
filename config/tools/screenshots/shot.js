const fs = require("fs-extra");
const puppeteer = require("puppeteer");

const cwdPath = __dirname + "/";
// 引数を受取る
let width = process.argv[2];
let url = process.argv[3];
let filename = process.argv[4];
let confFile = process.argv[5] || "config.json";
let conf = fs.readJsonSync(cwdPath + confFile); // 設定ファイル読み込み

// スクリーンショットを撮影
const screenshot = async (width, url, filename, conf) => {
  width = parseFloat(width);
  const browser = await puppeteer.launch();
  const browserPage = await browser.newPage();

  let device;
  switch (true) {
    case width <= conf.device_sp:
      device = conf.device_name.sp;
      break;
    case width >= conf.device_pc:
      device = conf.device_name.pc;
      break;
    default:
      device = conf.device_name.tab;
  }

  await browserPage.setViewport({ width: width, height: 1 });
  await browserPage.setExtraHTTPHeaders({
    // Basic認証
    Authorization: `Basic ${Buffer.from(
      `${conf.basic_username}:${conf.basic_password}`
    ).toString("base64")}`
  });

  await browserPage.goto(url, { waitUntil: "networkidle0" });
  let outputPath = await conf.output_filename
    .replace(/{{name}}/g, filename)
    .replace(/{{device}}/g, device);
  await browserPage.screenshot({
    path: cwdPath + conf.output_folder + "/" + outputPath,
    fullPage: true,
    type: conf.file_type
  });
  console.log(outputPath);
  await browser.close();
};

screenshot(width, url, filename, conf);
