var products = require('../models/products');

module.exports = {
	configure: function(app){
		app.get('/api/products', function(req, res){
			products.get(res);
		});
	}
};