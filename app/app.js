var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var connection = require('./connection');

fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  var route = require("./routes/" + file);
  var string = '/' + file.split('.')[0];
  router.use( string, route );
});


// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

connection.init();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var server = app.listen(3000, function () {
  console.log('Server Listening on port ' + server.address().port);
});
