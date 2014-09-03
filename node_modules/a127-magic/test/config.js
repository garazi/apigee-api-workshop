var should = require('should');
var a127config = require('../lib/config');
var path = require('path');
var fs = require('fs');
var os = require('os');

process.env.A127_CONFIG = path.resolve(__dirname, 'config');

describe('loads default config', function(done) {

  var config;

  before(function(done) {
    config = a127config.reload();
    done();
  });

  it('must include secrets', function(done) {
    config['a127.account.organization'].should.equal('ORGANIZATION');
    config['a127.account.username'].should.equal('USERNAME');
    config['a127.account.password'].should.equal('PASSWORD');
    config['a127.account.environment'].should.equal('ENVIRONMENT');
    done();
  });

  it('must include base defaults', function(done) {

    should.exist(config['a127.magic'].swaggerFile);
    should.exist(config['a127.magic'].controllers);
    done();
  });

  it('must load default config', function(done) {

    config.testString1.should.equal('defaultString');
    config.testArray1.should.eql([ 'default1', 'default2' ]);
    config.testHash1.should.eql({ test1: 'defaultHash1', test2: 'defaultHash2'});
    done();
  });

});

describe('loads config hierarchy', function() {

  var config;

  before(function(done) {
    config = a127config.load('development');
    done();
  });

  it('must have env', function(done) {
    a127config.env().should.equal('development');
    done();
  });

  it('must include base defaults', function(done) {

    should.exist(config['a127.magic'].swaggerFile);
    should.exist(config['a127.magic'].controllers);
    done();
  });

  it('must load default config', function(done) {

    config.testString2.should.equal('defaultString');
    config.testArray2.should.eql([ 'default1', 'default2' ]);
    config.testHash2.should.eql({ test1: 'defaultHash1', test2: 'defaultHash2'});
    done();
  });

  it('must load development config', function(done) {

    config.testString1.should.equal('devString');
    config.testArray1.should.eql([ 'dev1', 'dev2' ]);
    config.testHash1.should.eql({ test1: 'devHash1', test2: 'devHash2'});
    done();
  });

});

describe('load variations', function() {

  var envFile = path.resolve(__dirname, 'config/.a127_env');

  before(function(done) {
    fs.writeFileSync(envFile, 'development', 'utf8');
    done();
  });

  after(function(done) {
    fs.unlinkSync(envFile);
    done();
  });

  it('should load using NODE_ENV if present', function(done) {
    process.env.NODE_ENV = 'development';
    config = a127config.reload();
    a127config.env().should.equal('development');
    done();
  });

  it('should give A127_ENV precedence over NODE_ENV', function(done) {
    process.env.NODE_ENV = 'test';
    process.env.A127_ENV = 'development';
    config = a127config.reload();
    a127config.env().should.equal('development');
    done();
  });

  it('should load using file if present and no env var directives', function(done) {
    delete(process.env.NODE_ENV);
    delete(process.env.A127_ENV);;
    config = a127config.reload();
    a127config.env().should.equal('development');
    done();
  });

});
