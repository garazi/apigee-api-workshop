'use strict';

var a127Config = require('./config');
var swaggerTools = require('swagger-tools').middleware.v2_0;
var volosSwagger = require('volos-swagger');
var loader = require('./loader');

module.exports = middleware;

function middleware() {

  var config = a127Config.load();
  var swaggerObject = loader.load();

  var useStubs = false;
  var startConfig = config._a127_start_config;
  if (startConfig) {
    if (startConfig.mock) { config.controllers.useStubs = true; }
    if (startConfig.debug && !process.env.DEBUG) {
      process.env.DEBUG = startConfig.debug;
    }
  }

  var swaggerMiddleware = volosSwagger(swaggerObject);

  return chain([
    swaggerTools.swaggerMetadata(swaggerObject),
    swaggerTools.swaggerValidator(),
    volosSwagger(swaggerObject),
    swaggerTools.swaggerRouter(config['a127.magic'].controllers)
  ]);
}

function chain(middlewares) {

  if (!middlewares || middlewares.length < 1) {
    return function(req, res, next) { next(); };
  }

  return function(req, res, next) {
    function createNext(middleware, index) {
      return function(err) {
        if (err) { return next(err); }

        var nextIndex = index + 1;
        var nextMiddleware = middlewares[nextIndex] ? createNext(middlewares[nextIndex], nextIndex) : next;
        middleware(req, res, nextMiddleware);
      };
    }
    return createNext(middlewares[0], 0)();
  };
}
