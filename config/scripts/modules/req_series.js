module.exports = opt => {
  return (req, res, next) => {
    let requestPath = req ? req.url : false;
    if (/\/$/.test(requestPath)) requestPath += "index.html";

    let match = !opt.reqFile.every(reg => {
      return !reg.test(requestPath);
    });
    if (match) {
      let data;
      opt.command.some((cmd, index) => {
        (async () => {
          data = cmd.process(requestPath, data, cmd.option);
          if (data.toString() === "[object Promise]") {
            await data.then(result => {
              data = result;
            });
          }
          if (opt.command.length === index + 1) {
            if (/\.css$/.test(requestPath)) res.writeHead(200, {'Content-Type': 'text/css'});
            if (/\.js$/.test(requestPath)) res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(data);
          }
        })();
      });
    } else {
      next();
    }
  };
};
