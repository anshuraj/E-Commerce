var express = require('express');
var users = require('../models/users');
var userRoute = express.Router();

module.exports = function( req, res ){
	userRoute.get('/getusers', function(req, res) {
		users.getAllUsers( res );
	});
	return userRoute;
}
	