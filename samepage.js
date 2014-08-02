var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var port = 3000;
var app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.route('/').get(function (req, res) {
  res.send("Hello Samepage");
});

var pageHandler = function (req, res) {
  res.write("req.method = " + req.method + "\n");
  res.write("req.url =" + req.url + "\n");
  res.write("req.query = " + JSON.stringify(req.query) + "\n");
  res.write("req.body = " + JSON.stringify(req.body) + "\n");
  res.write("req.params = " + JSON.stringify(req.params) + "\n");
  res.end();
};

app.route('/page').all(pageHandler);
app.route('/page/:id').all(pageHandler);

app.route('/eval').post(function(req, res) {
  var result = eval(req.body.exp);
  res.send(JSON.stringify(result));
});

app.listen(port);
console.log("connect to: http://localhost:" + port);