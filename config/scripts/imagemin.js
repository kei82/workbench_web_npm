const fs = require('fs-extra');
const globby = require('globby');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

const outputDir = 'output/'; // 画像を出力フォルダ
const imgPattern = ['src/**/*.{jpg,jpeg,png,gif,svg}']; // 画像を読込パターン
const globOptions = {
  matchBase: true,
  onlyFiles: true,
}

const imageminStart = (inputFile, outputFile) => {
  imagemin([inputFile], {
    use: [
      imageminMozjpeg({
        quality: 95,
        progressive: true
      }),
      imageminPngquant({
        quality: 90,
        speed: 5
      }),
      imageminGifsicle(),
      imageminSvgo()
    ]
  })
  .then((files) => {
    fs.outputFile(outputFile, files[0].data);
  });
}

const glob = (pattern, options) => {
  globby(pattern, options)
    .then((files) => {
      files = files
      files.forEach((file) => {
        imageminStart(file, outputDir + file);
      });
    });
}

glob(imgPattern, globOptions);
