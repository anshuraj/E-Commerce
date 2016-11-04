var express = require('express');
var router = express.Router();

var carts = require('../models/carts');

module.exports = function( req, res ){
	router.get('/', function(req, res){
		carts.get(res);
	});
	router.post('/addtocart', function(req, res){
		carts.add( req, res );
	});
	router.put('/', function(req, res){
		carts.update( req.body, res );
	});
	router.delete('/', function(req, res){
		carts.delete(req.body, res);
	});
	return router;
};
