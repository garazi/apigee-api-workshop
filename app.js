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
var config = require('./config');
var app = express();

var nodemailerConnectorObject;

app.use(express.bodyParser());

app.use(a127.middleware());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.all('/:dest', function(req, res, next) {
    if (req.params.dest === "mail") {
        nodemailerConnectorObject.dispatchRequest(req, res);
    } else {
        next();
    }
});

app.get('/demo-data', routes.demo);
app.get('/addReview/:id', routes.addreview);
app.get('/details/:id', routes.details);
app.get('/', routes.index);

// app.use("/", express.static(__dirname));
app.use(express.static(__dirname + '/public'));

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