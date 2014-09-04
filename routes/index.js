var request = require('request');
var async = require('async');
var config = require('../config');
var restaurantData = require('../data/restaurants.json');
var reviewsData = require('../data/reviews.json');

exports.index = function(req, res) {
    request(config.Server + '/restaurants', function(error, response, body) {
        var restaurantsArray = [];
        var restaurants = JSON.parse(body);
        var count = restaurants.count;
        for (var i = 0; i < count; i++) {
            var restaurant = restaurants.entities[i];
            restaurantsArray.push(restaurant);
        }
        res.render('index', {
            restaurants: restaurantsArray
        });
    })
};

exports.details = function(req, res) {
    request(config.Server + "/restaurants/" + req.params.id, function(error, response, body) {
        var payload = JSON.parse(body);
        // res.send(payload)
        res.render('details', {
            restaurant: payload.restaurant.entities[0],
            reviews: payload.reviews
        });
    });
};

exports.addreview = function(req, res) {
    res.render('form', {
        restaurantID: req.params.id
    });
};

exports.demo = function(req, res) {
    console.log('demo')
    async.parallel({
        restaurants: function(callback) {
            request.post(config.UG + "/restaurants", {
                form: JSON.stringify(restaurantData)
            }, function(err, response, body) {
                if (err) {
                    console.log('boom');
                } else {
                    var data = JSON.parse(body);
                    callback(null, data);
                }
            });
        },
        reviews: function(callback) {
            request.post(config.UG + "/reviews", {
                form: JSON.stringify(reviewsData)
            }, function(err, response, body) {
                if (err) {
                    console.log('boom');
                } else {
                    var data = JSON.parse(body);
                    callback(null, data);
                }
            });
        },
        users: function(callback) {
        request.post(config.UG + "/users", {
            form: JSON.stringify(usersData)
        }, function(err, response, body) {
            if (err) {
                console.log('boom');
            } else {
                var data = JSON.parse(body);
                callback(null, data);
            }
        });
    }
    }, function(err, results) {
        res.send(results);
    });
};