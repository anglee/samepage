var traceur = require("traceur");
var traceur_filter = function(filename) {
  // don't transpile our dependencies, just our app
  var shouldCompile = filename.indexOf('node_modules') === -1;
  if (shouldCompile) {
    console.log("tracer compile", filename);
  }// else {
//    console.log("tracer does NOT compile", filename);
//  }
  return shouldCompile;
};
var traceur_options = {
  experimental: true
};
traceur.require.makeDefault(traceur_filter, traceur_options);
var express = require("express");
var https = require('https');
var http = require('http');
var fs = require('fs');
var inspect = require('util').inspect;

var socketio  = require('socket.io');
var cors = require("cors");
var bodyParser = require("body-parser");
var homepageHandler = require("./es6-homepagehandler").homepageHandler;

var app = express();
var port = 3000;

// Create an HTTP service.
//var server = app.listen(port);
var httpServer = http.createServer(app).listen(port);
console.log("connect to: http://localhost:" + port);

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('Key-cert.pem')
};
console.log(inspect(options));

// Create an HTTPS service identical to the HTTP service.
var httpsServer = https.createServer(options, app).listen(3001);

var io = socketio.listen(httpServer);

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.route('/').get(homepageHandler);

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

var evaluate = function(req) {
  var promise = new Promise(function(resolve, reject) {
    var result = eval(req.body.exp);
    resolve({
      exp: req.body.exp,
      result: result
    });
  });
  return promise;
};

var deliver = function(evalObj) {
  io.sockets.emit("eval_finish", JSON.stringify(evalObj));
};

app.route('/eval').post(function(req, res) {
  evaluate(req).then(deliver).catch(function(error) {
    console.log("eval failed", error);
  });
});

app.use('/app', express.static('public'));

//Promise.resolve() will create a promise that resolves to whatever value you give it
Promise.resolve("Hello Promise").then(function(it) {
  console.log(it);
});
