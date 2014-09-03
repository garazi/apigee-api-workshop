'use strict';

var volosSwagger = require('volos-swagger');
//var config = require('./config').load();
var loader = require('./loader');
var swaggerObject = loader.load();
var resources = volosSwagger(swaggerObject).resources;

module.exports = function(name) {
  return resources[name];
};
