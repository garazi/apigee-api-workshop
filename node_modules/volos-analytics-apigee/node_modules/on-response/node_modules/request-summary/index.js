
var bytes = require('bytes');

/**
 * Expose `summary`.
 */

exports = module.exports = summary;

/**
 * Define tokens container.
 */

var tokens = exports.tokens = {};

/**
 * Return a request summary.
 *
 * @param {Request} req
 * @param {Response} res
 * @return {Object}
 */

function summary (req, res) {
  var result = {};
  Object.keys(exports.tokens).forEach(function (key) {
    var val = tokens[key](req, res);
    if (val) result[key] = val;
  });
  return result;
}

/**
 * Define a token function with the given `name`,
 * and callback `fn(req, res)`.
 *
 * @param {String} name
 * @param {Function} fn
 * @return {Object} exports for chaining
 * @api public
 */

exports.token = function(name, fn) {
  exports.tokens[name] = fn;
  return this;
};

/**
 * request url
 */

exports.token('url', function (req) {
  return req.originalUrl || req.url;
});

/**
 * request method
 */

exports.token('method', function (req) {
  return req.method;
});

/**
 * UTC date
 */

exports.token('date', function () {
  return new Date();
});

/**
 * normalized referrer
 */

exports.token('referrer', function (req) {
  return req.headers.referer || req.headers.referrer;
});

/**
 * remote address
 */

exports.token('remoteAddress', function (req) {
  if (req.ip) return req.ip;
  if (req._remoteAddress) return req._remoteAddress;
  var sock = req.socket;
  if (sock.socket) return sock.socket.remoteAddress;
  return sock.remoteAddress;
});

/**
 * HTTP version
 */

exports.token('httpVersion', function (req) {
  return req.httpVersionMajor + '.' + req.httpVersionMinor;
});

/**
 * UA string
 */

exports.token('userAgent', function (req) {
  return req.get('User-Agent');
});

/**
 * Request ID
 */

exports.token('id', function (req, res) {
  return req._id;
});

/**
 * Request Content Received
 */

exports.token('size', function (req, res) {
  return parseInt(req._received, 10);
});

