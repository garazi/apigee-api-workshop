var request = require('request');

exports.index = function(req, res) {
    request('http://localhost:8888/restaurants', function(error, response, body) {
        var restaurantsArray = [];
        var restaurants = JSON.parse(body);
        var count = restaurants.count;
        for (var i=0; i<count; i++) {
            var restaurant = restaurants.entities[i];
            restaurantsArray.push(restaurant);
        }
        res.render('index', {
            restaurants: restaurantsArray
        });
    })
};

exports.details = function (req, res) {
	request("http://localhost:8888/restaurants/" + req.params.id, function (error, response, body) {
		var payload = JSON.parse(body);
		// res.send(payload)
		res.render('details', {
			restaurant: payload.restaurant.entities[0],
			reviews: payload.reviews
		});
	});
};

exports.addreview = function (req, res) {
	res.render('form', {
		restaurantID: req.params.id
	})
}