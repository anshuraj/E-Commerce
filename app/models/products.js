var connection = require('../connection');

function Products() {
	this.get = function(res){
		connection.acquire(function(err, con){
			con.query('select * from products', function(err, result){
				con.release();
				res.send(result);
				console.log('get request');
			});
		});
	};

}

module.exports = new Products;