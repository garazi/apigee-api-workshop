request = require('request');
// express = require('express')
// app = express();
// app.use(express.bodyParser());

module.exports = {
	getReviews: getReviews,
	postReview: postReview
}

function getReviews (req, res) {
	request('http://localhost:8080/workshop/sandbox/reviews', function(error, response, body) {
        if (error) {
            res.send(error);
        } else {
            res.send(body);
        }
    });
}

function postReview (req, res) {
	request.post('http://localhost:8080/workshop/sandbox/reviews', {
        form: JSON.stringify(req.body)
    }, function(error, response, body) {
        if(error) {
            res.send(error)
        } else {
            res.send(body);
        }      
    });
}