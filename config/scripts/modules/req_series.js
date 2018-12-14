"use strict";

module.exports = (req, res, opt) => {
  let requestPath = req ? req.url : false;
  if (/\/$/.test(requestPath)) requestPath += "index.html";

  let data;
  opt.command.forEach((cmd, index) => {
    data = cmd(requestPath, data, cmd.option);
    if (opt.command.length === index + 1) {
      if (data) {
        if (/\.css$/.test(requestPath))
          res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      } else {
        res.end("Not found " + requestPath);
      }
    }
  });
};
