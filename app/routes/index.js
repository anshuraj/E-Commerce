var express = require('express');
var router = express.Router();

module.exports = function( req, res ){	
	router.get('/api', function(req, res){
		res.send({status: 1, message: 'welcome'});
	});
	return router;
};