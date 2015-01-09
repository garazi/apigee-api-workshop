
/**
 * Expose `summary`.
 */

exports = module.exports = summary;

/**
 * Define tokens container.
 */

var tokens = exports.tokens = {};

/**
 * Return a response summary.
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
 * Status code.
 */

exports.token('status', function (req, res)  {
  return res.headerSent ? res.statusCode : null;
});

/**
 * Response time.
 */

exports.token('time', function (req) {
  return Date.now() - req._startTime;
});

/**
 * Response size - bytes sent.
 */

exports.token('size', function (req, res) {
  return res._sent;
});

/**
 * Content type.
 */

exports.token('type', function (req, res) {
  return res.get('content-type');
});

/**
 * Content length.
 */

exports.token('length', function (req, res) {
  return parseInt(res.get('content-length'), 10);
});
