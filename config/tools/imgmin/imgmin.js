module.exports = imgmin = cmd => {
  let compress_images = require("compress-images");

  let pattern = "**/*.{jpg,JPG,jpeg,JPEG,png,PNG,svg,gif,GIF}";
  let inputPath = cmd.root + pattern;
  let outputPath = cmd.output;

  compress_images(
    inputPath,
    outputPath,
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "70"] } },
    { png: { engine: "pngout", command: ["--quality=70-80"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: false } },
    function(error, completed, statistic) {
      if (error) console.error(error.engine, error.input);
    }
  );
};
