var should = require('should');
var a127config = require('../lib/config');
var loader = require('../lib/loader');
var path = require('path');
var fs = require('fs');
var yaml = require('yamljs');

var CONFIG_DIR = path.resolve(__dirname, 'config');
process.env.A127_CONFIG = CONFIG_DIR;

var SWAGGER_FILE = path.resolve(CONFIG_DIR, 'swagger.yaml');

describe('swagger.yaml replacement', function(done) {

  it('must load yaml', function(done) {

    var swaggerObject = yaml.load(SWAGGER_FILE);
    var swaggerConfig = swaggerObject['x-a127-config'];

    swaggerConfig.testString1.should.equal('value');
    swaggerConfig.testArray1.should.eql([ 'one', 'two' ]);
    swaggerConfig.testHash1.should.eql({ one: 'one', two: 'two'});

    done();
  });

  it('empty config must not change the structure', function(done) {

    var config = a127config.load();
    var originalSwagger = yaml.load(SWAGGER_FILE);
    var convertedSwagger = loader.load(SWAGGER_FILE, {});

    originalSwagger.should.eql(convertedSwagger);

    done();
  });

  it('must load and replace config', function(done) {

    var config = a127config.reload();
    var swaggerObject = loader.load(SWAGGER_FILE, config);

    var swaggerConfig = swaggerObject['x-a127-config'];

    swaggerConfig.testString1.should.equal('defaultString');
    swaggerConfig.testArray1.should.eql([ 'default1', 'default2' ]);
    swaggerConfig.testHash1.should.eql({ test1: 'defaultHash1', test2: 'defaultHash2'});

    swaggerConfig["a127.account.password"].should.equal('PASSWORD');

    var swaggerReference = swaggerObject['x-volos-test'];
    swaggerReference.testReference1.should.equal('defaultString');
    swaggerReference.testReference2.should.eql([ 'default1', 'default2' ]);
    swaggerReference.testReference3.should.eql({ test1: 'defaultHash1', test2: 'defaultHash2'});

    done();
  });
});
