var express = require('express');
var router = express.Router();

router.get('/api', function(req, res){
	res.send({status: 1, message: 'welcome'});
});

module.exports = router;