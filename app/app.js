var express = require('express');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var connection = require('./connection');

var routes = require('./routes/index');
var products = require('./routes/products');
var users = require('./routes/users');


connection.init();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/', routes);
app.use('/api/products', products);
app.use('/api/users', users);


var server = app.listen(3000, function () {
  console.log('Server Listening on port ' + server.address().port);
});