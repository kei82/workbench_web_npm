var express = require("express");
var php = require("node-php");
var path = require("path");

var app = express();

app.use("/", php.cgi("wordpress"));

app.listen(9090);

console.log("Server listening!");
