var express = require('express');
var router = express.Router();

var products = require('../models/products');

module.exports = function( req, res ){
	router.post('/getproducts', function(req, res){
		products.getProductDetails( req, res );
	});

	router.post('/add', function(req, res){
		products.saveProduct( req, res );
	});
	return router;
};
