var express = require('express');
var users = require('../models/users');
var userRoute = express.Router();

userRoute.get('/getusers', function(req, res) {
		users.get( res );
});

module.exports = userRoute;
