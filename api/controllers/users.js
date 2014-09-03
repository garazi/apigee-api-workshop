request = require('request');

var config = require('../../config')

module.exports = {
	getUsers: getUsers
}

function getUsers (req, res) {
	request(config.UG + '/users', function(error, response, body) {
        if (error) {
            res.send(error);
        } else {
            res.send(body);
        }
    });
}