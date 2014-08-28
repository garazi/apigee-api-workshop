request = require('request');

var config = require('../../config')

module.exports = {
	getReviews: getReviews,
	postReview: postReview
}

function getReviews (req, res) {
	request(config.UG + '/reviews', function(error, response, body) {
        if (error) {
            res.send(error);
        } else {
            res.send(body);
        }
    });
}

function postReview (req, res) {
	request.post(config.UG + '/reviews', {
        form: JSON.stringify(req.body)
    }, function(error, response, body) {
        if(error) {
            res.send(error)
        } else {
            res.send(body);
        }      
    });
}