var connection = require('../connection');

function Roles() {
	this.get = function(res){
		connection.acquire(function(err, con){
			con.query('select * from roles', function(err, result){
				con.release();
				res.send(result);
			});
		});
	};

	this.create = function(roles, res) {
		connection.acquire(function(err, con){
			con.query('insert into roles set ?', roles, function(err, result){
				con.release();
				if(err){
					res.send({status: 0, message: 'roles save failed '});
				} else{
					res.send({status: 1, message: 'roles saved'});
				}
			});
		});
	};

	this.update = function(roles, res) {
		connection.acquire(function(err, con){
			con.query('update roles set ? where id = ?', [roles, roles.id], function(err, result){
				con.release();
				if(err){
					res.send({status: 0, message: 'roles update failed'});
				} else {
					res.send({status: 1, message: 'roles update successfull'});
				}
			});
		});
	};

	this.delete = function(roles, res) {
		connection.acquire(function(err, con){
			con.query('delete from roles where id = ?', roles.id, function(err, result){
				con.release();
				if(err){
					res.send({status: 1, message: 'roles failed to delete'});
				} else {
					res.send({status: 0, message: 'roles deleted successfully'});
				}
			});
		});
	};

}

module.exports = new Roles;