var _ENVIRONMENT = 'Development';
//process.env.NODE_ENV = env;
/**
	We will configure the database credentials as well as API Layer End point based on the environment selected.
*/
switch (_ENVIRONMENT) {
	case 'Development':
		var _DBHOST 			= 'localhost'
		, 	_DBUSER 			= 'root'
		, 	_DBPASS 			= 'BeatTheDefeat'
		, 	_DBNAME 			= 'ecommerce'
		,	_DEBUG				= false;
	break;

	case 'Staging':
		var _DBHOST 			= 'localhost'
		, 	_DBUSER 			= 'root'
		, 	_DBPASS 			= 'root'
		, 	_DBNAME 			= 'ecommerce'
		,	_DEBUG				= false;
	break;

	case 'Production':
		var _DBHOST 			= 'localhost'
		, 	_DBUSER 			= 'root'
		, 	_DBPASS 			= 'root'
		, 	_DBNAME 			= 'ecommerce'
		,	_DEBUG				= false;
	break;
	default:
}

module.exports = {
		  host            		: _DBHOST,
			user            		: _DBUSER,
			password        		: _DBPASS,
			database 				    : _DBNAME,
			debug 				      : _DEBUG
}
