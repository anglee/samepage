System.register("samepage", [], function() {
  "use strict";
  var __moduleName = "samepage";
  var traceur = require("traceur");
  var express = require("express");
  var socketio = require('socket.io');
  var cors = require("cors");
  var bodyParser = require("body-parser");
  var app = express();
  var port = 3000;
  var server = app.listen(port);
  console.log("connect to: http://localhost:" + port);
  var io = socketio.listen(server);
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({type: 'application/vnd.api+json'}));
  app.route('/').get(function(req, res) {
    res.send("Hello Samepage");
  });
  var pageHandler = function(req, res) {
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
    io.sockets.emit("eval_finish", JSON.stringify({
      exp: req.body.exp,
      result: result
    }));
  });
  app.use('/app', express.static('public'));
  var ppp = (function(a, b) {
    return a + b;
  });
  console.log(ppp(100, 20));
  return {};
});
System.get("samepage" + '');
