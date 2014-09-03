request = require('request');

var config = require('../../config')

module.exports = {
	getReviews: getReviews,
	postReview: postReview
}

function getReviews (req, res) {
	console.log(req.swagger.params)
	var qs = "";
	if (req.swagger.params.restID.value) {
		var restID = req.swagger.params.restID.value;
		qs = "?ql=restID=" + restID;
		console.log('restID: %s', restID)
	} else if (req.swagger.params.rating.value) {
		var rating = req.swagger.params.rating.value;
		console.log('rating: %s', rating)
		qs = "?ql=rating=" + rating;
	}
	console.log(qs)
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
            res.send(error)
        } else {
            res.send(body);
        }      
    });
}