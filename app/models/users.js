var connection = require('../connection');

var users = function() {
	this.get = function(res){
		connection.acquire(function(err, con){
			con.query('select * from users', function(err, result){
			        res.send(result);
				con.release();
				console.log('get request');
			});
		});
	};
  return this;
}

module.exports = users;
