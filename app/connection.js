var mysql = require('mysql2');
var config = require('./config.js');
Q = require('q');

function Connection(){
	this.pool = null;

	this.init = function(){
		this.pool = mysql.createPool({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database
		});
	};

	this.acquire = function(callback) {
		this.pool.getConnection(function(err, connection){
			callback(err, connection);
		});
	}
	
	this.bulkQuery = function( queryArr, callback ){
		this.pool.getConnection(function(err, connection){
			var queryPromises = [];
			for( var i in queryArr ){
				var tmp = function(){
					var defered = Q.defer();
					connection.query( queryArr[i], function( error, result ){
						if( error == null ){
							defered.resolve({'index' : i, 'result' : true });
						} else {
							defered.resolve({'index' : i, 'result' : false });
						}
					});
					return defered.promise;
				}
				queryPromises.push(tmp());
			}
			Q.all( queryPromises ).then( function( results ){
				callback(err, results);
			});
		});
	}
}

module.exports = new Connection();

