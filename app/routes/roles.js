var express = require('express');
var router = express.Router();

var roles = require('../models/roles');

module.exports = function( req, res ){
	router.get('/', function(req, res){
		roles.get(res);
	});
	router.post('/', function(req, res){
		roles.create(req.body, res);
	});
	router.put('/', function(req, res){
		roles.update(req.body, res);
	});
	router.delete('/', function(req, res){
		roles.delete(req.body, res);
	});
	return router;
};
