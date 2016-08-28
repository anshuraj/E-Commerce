var connection = require('../connection');

var users = {
	getAllUsers: function(res){
		connection.acquire(function(err, con){
			con.query('select * from users', function(err, result){
				con.release();
				res.send(result);
			});
		});
	}
}

module.exports = users;
