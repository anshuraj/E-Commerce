var express = require('express');
var router = express.Router();

var products = require('../models/products');

module.exports = function( req, res ){
	router.get('/getproducts', function(req, res){
		products.get(res);
	});

	router.post('/add', function(req, res){
		products.saveProduct( req, res );
	});
	return router;
};
