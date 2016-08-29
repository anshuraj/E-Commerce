var connection = require('../connection');

var category = {
	get : function(res){
		connection.acquire(function(err, con){
			con.query('select * from category', function(err, result){
				con.release();
				res.send(result);
			});
		});
	},
	create : function(category, res) {
		connection.acquire(function(err, con){
			con.query('insert into category set ?', category, function(err, result){
				con.release();
				console.log(category);
				console.log(err);
				if(err){
					res.send({status: 0, message: 'category save failed '});
				} else{
					res.send({status: 1, message: 'category saved'});
				}
			});
		});
	},
	update : function(category, res) {
		connection.acquire(function(err, con){
			con.query('update category set ? where id = ?', [category, category.id], function(err, result){
				con.release();
				console.log(category);
				console.log(err);
				if(err){
					res.send({status: 0, message: 'category update failed'});
				} else {
					res.send({status: 1, message: 'category update successfull'});
				}
			});
		});
	},
	delete : function(category, res) {
		connection.acquire(function(err, con){
			con.query('delete from category where id = ?', category.id, function(err, result){
				con.release();
				if(err){
					res.send({status: 1, message: 'category failed to delete'});
				} else {
					res.send({status: 0, message: 'category deleted successfully'});
				}
			});
		});
	}
}

module.exports = category;