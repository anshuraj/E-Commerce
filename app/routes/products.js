var express = require('express');
var products = require('../models/products');
var productRoute = express.Router();

module.exports = function( req, res ){
	productRoute.get('/getproducts', function(req, res){
		products.get(res);
	});
	return productRoute;
};
