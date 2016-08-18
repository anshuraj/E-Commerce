var connection = require('../connection');

function Users() {
	this.get = function(res){
		connection.acquire(function(err, con){
			con.query('select * from users', function(err, result){
				con.release();
				res.send(result);
			});
		});
	};

	this.create = function(users, res) {
		connection.acquire(function(err, con){
			con.query('insert into users set ?', users, function(err, result){
				con.release();
				if(err){
					res.send({status: 0, message: 'user creation failed'});
				} else{
					res.send({status: 1, message: 'user created successfully'});
				}
			});
		});
	};

	this.update = function(users, res) {
		connection.acquire(function(err, con){
			con.query('update users set ? where id = ?', [users, users.id], function(err, result){
				con.release();
				if(err){
					res.send({status: 0, message: 'user update failed'});
				} else {
					res.send({status: 1, message: 'user update successfull'});
				}
			});
		});
	};

}

module.exports = new Users;