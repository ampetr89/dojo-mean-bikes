var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
const reg = new RegExp('\\.js$', 'i')

mongoose.connect('mongodb://localhost/bikes_db');
var models_path = path.join(__dirname, './../models');

mongoose.Promise = global.Promise;

// read all of the files in the models_path and require (run) each of the javascript files
// readdirSync ensures the files have been run before you read them(?)
fs.readdirSync(models_path).forEach(function(file) {
  if(reg.test(file)){
    require(path.join(models_path, file));
  }
});
