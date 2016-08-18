var express = require('express');
var products = require('../models/products');
var productRoute = express.Router();

productRoute.get('/getproducts', function(req, res){
	products.get(res);
});

module.exports = productRoute;
