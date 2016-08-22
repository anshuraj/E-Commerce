var express = require('express');
var app = express();
var router = express.Router();
var bodyparser = require('body-parser');
var connection = require('./connection');

var routes = require('./routes/index');
var products = require('./routes/products');
var users = require('./routes/users');
var address = require('./routes/address');
var category = require('./routes/category');


connection.init();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use('/', routes);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/address', address);
app.use('/api/category', category);


var server = app.listen(3000, function () {
  console.log('Server Listening on port ' + server.address().port);
});