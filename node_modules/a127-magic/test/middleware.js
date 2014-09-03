var should = require('should');
var path = require('path');
var a127config = require('../lib/config');
var middleware = require('../lib/middleware');

var CONFIG_DIR = path.resolve(__dirname, 'config');
process.env.A127_CONFIG = CONFIG_DIR;

var SWAGGER_FILE = path.resolve(CONFIG_DIR, 'swagger.yaml');

var config = a127config.load();

config['a127.magic'].swaggerFile = SWAGGER_FILE;

it('middleware must load correctly', function(done) {
  middleware();
  done();
});
