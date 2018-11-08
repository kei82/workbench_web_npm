const puppeteer = require("puppeteer");

const cwdPath = __dirname + "/";
let inputData = JSON.parse(process.argv[2].slice(1).slice(0, -1)); // 引数を受取る

// スクリーンショットを撮影
const screenshot = async (width, url, filename, conf) => {
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
  let outputPath = conf.output_filename
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

// 撮影を繰り返す
const screenshotRepeat = conf => {
  for (let page of conf.page) {
    for (let width of conf.viewport) {
      screenshot(width, page["ページURL"], page["ファイル名"], conf);
    }
  }
};

screenshotRepeat(inputData);
