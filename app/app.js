var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes/routes');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);

var server = app.listen(3000, function () {
  console.log('Server Listening on port ' + server.address().port);
});