var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var connection = require('./connection');

connection.init();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.set( 'router', router );

var routes = [];
var index = 0;

fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  routes[ index ] = require("./routes/" + file);
  var string = '/' + file.split('.')[0];
  app.use( string, routes[ index ]() );
  index++;
});

var server = app.listen(3000, function () {
  console.log('Server Listening on port ' + server.address().port);
});
