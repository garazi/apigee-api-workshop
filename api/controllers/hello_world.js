'use strict';

var util = require('util');

module.exports = {
  hello: hello
}

function hello(req, res) {
  var name = req.swagger.params.name.value;
  var person = name ? util.format('Hello, %s', name) : 'Hello, stranger!';
  res.json(person);
}