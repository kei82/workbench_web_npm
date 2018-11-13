const fs = require("fs-extra");
const validate = require("html5-validator");

validate("src/index.html").then(result => {
  console.log(result.messages);
});
