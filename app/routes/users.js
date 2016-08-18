var express = require('express');
var router = express.Router();

var users = require('../models/users');

router.get('/', function(req, res){
	users.get(res);
});
router.post('/', function(req, res){
	users.create(req.body, res);
});
router.put('/', function(req, res){
	users.update(req.body, res);
});

module.exports = router;