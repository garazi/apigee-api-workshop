var a127 = require('a127-magic');
var express = require('express');
var async = require('async');
var request = require('request');
var usergrid = require('usergrid');
var quotaModule = require('volos-quota-memory');
var cm = require('volos-cache-memory');
var nodemailerConnector = require('volos-mailer');
var avault = require('avault').createVault(__dirname);
var routes = require('./routes');
var config = require('./config')
var app = express();

var nodemailerConnectorObject;

app.use(a127.middleware());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());

app.all('/:dest', function(req, res, next) {
    if (req.params.dest === "mail") {
        nodemailerConnectorObject.dispatchRequest(req, res);
    } else {
        next();
    }
});

var cache = cm.create('appCache', {
    ttl: 15000
});

// app.get('/restaurants', cache.connectMiddleware().cache(), function(req, res, next) {
//     request('http://localhost:8080/workshop/sandbox/restaurants', function(error, response, body) {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(body);
//         }
//     });
// });

// app.get('/restaurants/:id', function(req, res, next) {
//     async.parallel({
//             restaurant: function(callback) {
//                 request("http://localhost:8080/workshop/sandbox/restaurants/?ql=restID=" + req.params.id, function(error, response, body) {
//                     if (error) {
//                         res.send(error);
//                     } else {
//                         var result = JSON.parse(body);
//                         callback(null, result);
//                     }
//                 });
//             },
//             reviews: function(callback) {
//                 async.waterfall([
//                     function(callback) {
//                         request("http://localhost:8080/workshop/sandbox/reviews/?ql=restID=" + req.params.id, function(error, response, body) {
//                             if (error) {
//                                 res.send(error);
//                             } else {
//                                 data = JSON.parse(body);
//                                 callback(null, data);
//                             }
//                         });
//                     },
//                     function(data, callback) {
//                         var l = data.entities.length;
//                         var aggregate = 0;
//                         var i;
//                         for (i = 0; i < l; i++) {
//                             aggregate += data.entities[i].rating;
//                         }
//                         aggregate = {
//                             aggregate: +(aggregate / i).toFixed(2)
//                         }
//                         callback(null, data, aggregate);
//                     }
//                 ], callback);
//             }
//         },
//         function(err, results) {
//             res.send(results);
//         });
// });

// app.get('/reviews', function(req, res) {
//     request('http://localhost:8080/workshop/sandbox/reviews', function(error, response, body) {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send(body);
//         }
//     });
// })

var quota = quotaModule.create({
    timeUnit: 'hour',
    interval: 1,
    allow: 2
});

// app.post('/reviews', quota.connectMiddleware().apply({
//     identifier: 'Foo',
//     weight: 1
// }), function(req, res) {
//     request.post('http://localhost:8080/workshop/sandbox/reviews', {
//         form: JSON.stringify(req.body)
//     }, function(error, response, body) {
//         if(error) {
//             res.send(error)
//         } else {
//             res.send(body);
//         }      
//     });
// });
/* 
The following uses the non-middleware implementation of the volos-quota 
Make sure to comment out the route above if you want to use this one
*/
// app.post('/reviews', function(req, res) {
//     quota.apply({
//         identifier: 'Foo',
//         weight: 1
//     }, function(err, result) {
//         if (err) {
//             throw err;
//         } else {
//             console.log('Quota status: %s', result.isAllowed);
//             if (result.isAllowed) {
//                 request.post('http://localhost:8080/workshop/sandbox/reviews', {
//                     form: JSON.stringify(req.body)
//                 }, function(error, response, body) {
//                     res.send(body);
//                 });
//             } else {
//                 var errorMsg = {
//                     error: "You have exceeded the hourly quota"
//                 }
//                 res.send(JSON.stringify(errorMsg))
//             }
//         }
//     });
// });

app.get('/addReview/:id', routes.addreview)
app.get('/details/:id', routes.details);
app.get('/', routes.index);

// app.use("/", express.static(__dirname));
app.use(express.static(__dirname + '/public'));

// app.get('/hello', function(req, res) {
//     res.send('Hello from Express');
// });

app.listen('8888', function(req, res) {
    avault.get('garbageVault', function(profileString) {
        if (!profileString) {
            console.log('Error: required vault not found.');
        } else {
            var profile = JSON.parse(profileString);
            nodemailerConnectorObject = new nodemailerConnector.NodemailerConnector({
                "profile": profile,
                "configuration": undefined
            });
            nodemailerConnectorObject.initializePaths(nodemailerConnectorObject.configuration.restMap);
        }
    });
    console.log("Server started on :8888");
});