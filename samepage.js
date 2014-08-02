var express = require("express");

var app = express();

app.get('/', function (req, res) {
  res.send("Hello Samepage");
});

app.listen(3000);