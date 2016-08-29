var connection = require('../connection');

var products = {
	get: function(res){
		connection.acquire(function(err, con){
			con.query('select * from products', function(err, result){
				con.release();
				res.send(result);
				console.log('get request');
			});
		});
	}
}

module.exports = products;
