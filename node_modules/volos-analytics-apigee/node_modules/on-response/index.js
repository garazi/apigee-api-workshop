
var reqSummary = require('request-summary');
var resSummary = require('response-summary');

/**
 * Expose `onResponse`.
 */

module.exports = onResponse;

/**
 * Call back when the request has been processed.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} callback
 */

function onResponse (req, res, callback) {

  var sock = req.socket;

  // set the start-of-request variables as based on express.logger
  if (!req._startTime) {
    req._startTime = new Date();
  }
  if (!req._remoteAddress) {
    req._remoteAddress = sock.socket ? sock.socket.remoteAddress : sock.remoteAddress;
  }

  function finish () {
    res.removeListener('finish', finish);
    res.removeListener('close', finish);
    var summary = {
      request: reqSummary(req, res),
      response: resSummary(req, res)
    };
    if (callback) return callback(null, summary);
  }

  res.on('finish', finish);
  res.on('close', finish);
}
