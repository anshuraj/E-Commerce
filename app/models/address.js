var connection = require('../connection');

var address = {
	get :function(res){
		connection.acquire(function(err, con){
			con.query('select * from address', function(err, result){
				con.release();
				res.send(result);
			});
		});
	},
	create  : function(address, res) {
		connection.acquire(function(err, con){
			con.query('insert into address set ?', address, function(err, result){
				con.release();
				console.log(address);
				console.log(err);
				if(err){
					res.send({status: 0, message: 'address save failed '});
				} else{
					res.send({status: 1, message: 'address saved'});
				}
			});
		});
	},
	update  : function(address, res) {
		connection.acquire(function(err, con){
			con.query('update address set ? where id = ?', [address, address.id], function(err, result){
				con.release();
				console.log(address);
				console.log(err);
				if(err){
					res.send({status: 0, message: 'address update failed'});
				} else {
					res.send({status: 1, message: 'address update successfull'});
				}
			});
		});
	},
	delete  : function(address, res) {
		connection.acquire(function(err, con){
			con.query('delete from address where id = ?', address.id, function(err, result){
				con.release();
				if(err){
					res.send({status: 1, message: 'address failed to delete'});
				} else {
					res.send({status: 0, message: 'address deleted successfully'});
				}
			});
		});
	}
}

module.exports = address;