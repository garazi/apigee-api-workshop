// request = require('request');
var config = require('../../config');

module.exports = {
	getReviews: getReviews,
	postReview: postReview
}

function getReviews (req, res) {
	var qs = "";
	if (req.swagger.params.restID.value) {
		var restID = req.swagger.params.restID.value;
		qs = "?ql=restID=" + restID;
	} else if (req.swagger.params.rating.value) {
		var rating = req.swagger.params.rating.value;
		qs = "?ql=rating=" + rating;
	} else if (req.swagger.params.reviewer.value) {
		var reviewer = req.swagger.params.reviewer.value;
		qs = "?ql=reviewer=" + reviewer;
	}
	request(config.UG + '/reviews' + qs, function(error, response, body) {
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
            res.send(error);
        } else {
            res.send(body);
        }      
    });
}