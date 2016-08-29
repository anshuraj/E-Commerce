var express = require('express');
var router = express.Router();

var address = require('../models/address');

module.exports = function( req, res ){
	router.get('/', function(req, res){
		address.get(res);
	});
	router.post('/', function(req, res){
		address.create(req.body, res);
	});
	router.put('/', function(req, res){
		address.update(req.body, res);
	});
	router.delete('/', function(req, res){
		address.delete(req.body, res);
	});
	return router;
};