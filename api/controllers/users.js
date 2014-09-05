request = require('request');

var config = require('../../config')

module.exports = {
	getUsers: getUsers,
	getUserByID: getUserByID
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
function getUserByID (req, res) {
	var user = req.swagger.params.username.value;
	request(config.UG + "/users?ql=username='" + user + "'", function(error, response, body) {
        if (error) {
            res.send(error);
        } else {
            res.send(body);
        }
    });
}