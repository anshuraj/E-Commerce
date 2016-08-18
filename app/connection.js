var mysql = require('mysql');
var config = require('./config.js')
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
}

module.exports = new Connection();
