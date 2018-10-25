const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const csvParse = require("csv-parse");

let conf;
let csvData;

// csvをパース
const csvParser = csv => {
  return csvParse(csv, {
    columns: true,
    skip_empty_lines: true
  });
};

// スクリーンショットを撮影
const screenshot = async (PAGE_WIDTH, PAGE_URL, PAGE_NAME) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let DEVICE;
  switch (true) {
    case PAGE_WIDTH <= conf.DEVICE_SP:
      DEVICE = "SP";
      break;
    case PAGE_WIDTH >= conf.DEVICE_PC:
      DEVICE = "PC";
      break;
    default:
      DEVICE = "TAB";
  }

  page.setViewport({ width: PAGE_WIDTH, height: 1 });
  await page.setExtraHTTPHeaders({
    // Basic認証
    Authorization: `Basic ${Buffer.from(
      `${conf.BASIC_USERNAME}:${conf.BASIC_PASSWORD}`
    ).toString("base64")}`
  });
  await page.goto(PAGE_URL, { waitUntil: "networkidle0" });

  await page.screenshot({
    path: `${conf.OUTPUT_FOLDER}/${PAGE_NAME}_${DEVICE}.jpg`,
    fullPage: true,
    type: "jpeg"
  });
  await browser.close();
};

// 撮影を繰り返す
const screenshotRepeat = csv => {
  csv.on("readable", function() {
    let data;
    while ((data = csv.read())) {
      conf.VIEWPORT.forEach(PAGE_WIDTH => {
        screenshot(PAGE_WIDTH, data["ページURL"], data["ファイル名"]);
      });
    }
  });
};

const screenshotStart = () => {
  conf = fs.readJsonSync("config.json"); // 設定ファイル読み込み
  csvData = csvParser(fs.readFileSync(conf.INPUT_CSV)); // CSVファイル読み込み
  fs.mkdirsSync(conf.OUTPUT_FOLDER); // 出力フォルダ作成
  screenshotRepeat(csvData); // 撮影
};

screenshotStart();
