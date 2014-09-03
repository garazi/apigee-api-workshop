'use strict';

// todo: potentially pull stuff from vault as well...

var path = require('path');
var fs = require('fs');
var yaml = require('yamljs');
var debug = require('debug')('a127');
var _ = require('underscore');

module.exports = {
  env: getEnvironment,
  load: getConfig,
  reload: useConfig
};

var ENV_FILENAME = '.a127_env';
var SECRETS_FILENAME = '.a127_secrets';
var APP_ROOT = path.dirname(require.main.filename);
var CONFIG_DIR = path.resolve(APP_ROOT, 'config');

var BASE_DEFAULTS = {
  'a127.magic': {
    swaggerFile: path.resolve(APP_ROOT, 'api/swagger/swagger.yaml'),
    controllers: {
      useStubs: false,
      controllers: 'api/controllers'
    }
  }
};

var configDir, config, env;

function useConfig(a127Env) {

  env = config = undefined;
  configDir = process.env.A127_CONFIG || CONFIG_DIR;

  if (!fs.existsSync(configDir)) {
    throw new Error('config directory doesn\'t exist: ' + configDir);
  }

  env = a127Env ? a127Env : getEnvironment();

  var defaultConfig = readYamlFromConfigFile('default.yaml');
  var currentConfig = env ? readYamlFromConfigFile(env + '.yaml') : {};
  var secrets = readSecretsFromVault();

  if (debug.enabled) { debug('No config for env: ' + env + '. Using default.'); }

  config = _.extend(BASE_DEFAULTS, defaultConfig, currentConfig, secrets);
  return config;
}

// todo: actually use vault instead of file
function readSecretsFromVault() {
  return readYamlFromConfigFile(SECRETS_FILENAME);
}

function getEnvironment() {
  if (env) { return env; }
  env = process.env.A127_ENV || process.env.NODE_ENV;
  if (!env) { // load from file
    var envFile = path.resolve(configDir, ENV_FILENAME);
    env = readFileNoError(envFile);
  }
  if (debug.enabled) { debug('set environment: ' + env); }
  return env;
}

function readYamlFromConfigFile(fileName) {
  try {
    var file = path.resolve(configDir, fileName);
    var obj = yaml.load(file);
    if (debug.enabled) { debug('read config file: ' + file); }
    return obj;
  }
  catch(err) {
    if (debug.enabled) { debug('failed attempt to read config: ' + file); }
    return {};
  }
}

function readFileNoError(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (ex) {
    return null;
  }
}

function getConfig(a127Env) {
  if (!config || (a127Env && env !== a127Env)) { useConfig(a127Env); }
  return config;
}
