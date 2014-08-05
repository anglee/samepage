import {configFile} from "./es6-dependency.js";

var {readFileSync} = require('fs');  // use require for non-ES6 Node modules
console.log(readFileSync(configFile, 'utf-8'));

export var homepageHandler = (req, res) => {
  res.send("Hello Samepage");
};


