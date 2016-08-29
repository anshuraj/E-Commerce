var express = require('express');
var router = express.Router();

var category = require('../models/category');

module.exports = function( req, res ){
	router.get('/', function(req, res){
		category.get(res);
	});
	router.post('/', function(req, res){
		category.create(req.body, res);
	});
	router.put('/', function(req, res){
		category.update(req.body, res);
	});
	router.delete('/', function(req, res){
		category.delete(req.body, res);
	});
	return router;
};