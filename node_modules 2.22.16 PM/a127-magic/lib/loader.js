'use strict';

var fs = require('fs');
var yaml = require('yamljs');
var a127Config = require('./config');
var _ = require('underscore');
var stream = require('stream');

module.exports = {
  load: load
};

function load(file, config) {

  if (!config) { config = a127Config.load();}
  if (!file) { file = config.swaggerFile; }

  var sourceString = fs.readFileSync(file, 'utf8');
  var replacementString = doConfigReplacements(sourceString, config);
  return yaml.parse(replacementString);
}

function doConfigReplacements(source, config) {
  var sourceLines = source.split('\n');
  var returnLines = [];
  var inConfig, anchorIndent, finished;
  sourceLines.forEach(function(line) {
    if (finished) {
      returnLines.push(line);
    } else {
      if (inConfig && line[0] !== ' ') { // back to 0 indent after x-a127-config == we're done
        finished = true;
        returnLines.push(line);
      } else {
        var tokens = line.trim().split(' ');
        var keyToken = tokens[0];
        if (inConfig) { // this is potential config stuff, let's do it
          var indent = line.indexOf(tokens[0]);
          if (anchorIndent) { // we're inside a tag
            if (indent <= anchorIndent) { anchorIndent = null; }
          }
          if (!anchorIndent) { // start a tag?
            var key = keyToken.slice(0, keyToken.length - 1);
            var anchor = getAnchor(tokens);
            if (anchor) {
              var configValue = config[key];
              if (configValue) { // we need to do a replacement
                anchorIndent = indent;
                var upTo = line.lastIndexOf(anchor) + anchor.length;
                var partialLine = line.slice(0, upTo); // cut off anything after the reference
                var configYaml = yaml.stringify(configValue);
                if (typeof(configValue) === 'string') { // string goes inline
                  partialLine += ' ' + configYaml;
                  returnLines.push(partialLine);
                } else {
                  returnLines.push(partialLine); // anything else on following lines
                  var yamlLines = configYaml.split('\n');
                  var spaces = Array(indent + 3).join(' ');
                  for (var i = 0; i < yamlLines.length - 1; i++) { // length - 1 because last line is empty (was \n)
                    returnLines.push(spaces + yamlLines[i]);
                  }
                }
              } else {
                returnLines.push(line);
              }
            } else {
              returnLines.push(line);
            }
          }
        } else if (keyToken.indexOf('x-a127-config') === 0) {
          inConfig = true;
          returnLines.push(line);
        } else {
          returnLines.push(line);
        }
      }
    }
  });
  var replacementString = returnLines.join('\n');
  return replacementString;
}

function getAnchor(tokens) {
  for (var i = tokens.length - 1; i > 0; i--) {
    if (tokens[i][0] === '&') { return tokens[i]; }
  }
  return undefined;
}

function isAnchor(token) {
  return token[token.length - 1] === '&';
}
