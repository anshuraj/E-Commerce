var express = require('express');
var router = express.Router();

var users = require('../models/users');

module.exports = function( req, res ){
	router.get('/getusers', function(req, res) {
		users.getAllUsers( res );
	});
	router.post('/', function(req, res){
		users.create(req.body, res);
	});
	router.put('/', function(req, res){
		users.update(req.body, res);
	});
	return router;
}
	