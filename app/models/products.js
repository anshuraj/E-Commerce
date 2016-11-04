var connection = require('../connection');

var products = {
	getProductDetails: function( req, res ){
		/**
		 * Post Paramm
		 * {
		 * 	"productId" : "1",
		 * 	"searchText" : "bla"
		 * }
		 * */
		var reqData = req.body;
		connection.acquire(function(err, con){
			var query = 'SELECT `products`.* FROM `products` ';
			if( reqData.searchText != null && reqData.searchText != '' ){
				query += " LEFT JOIN `categories` ON `categories`.`id` = `products`.`category_id` WHERE ( `products`.`code` LIKE '%"+reqData.searchText+"%' OR `products`.`label` LIKE '%"+reqData.searchText+"%' OR `categories`.`label` LIKE '%"+reqData.searchText+"%' )";
			}
			if( reqData.productId != null ){
				if( reqData.searchText != null && reqData.searchText != '' )
					query += " AND";
				else
					query += " WHERE";
				query += " `products`.`id` = '"+reqData.productId+"'";
			}
			var response = { 'result' : false, 'reason' : 'Product not found.' };
			con.query( query, function(err, result){
				con.release();
				if( err != null ){
					response = { 'result' : false, 'reason' : 'Request Failed' };
				} else if( result.length != 0 ) {
					response = { 'result' : true, 'reason' : 'Request Success', 'data' : result };
				}
				res.send(response);
			});
		});
	},
	saveProduct: function( req, res ){
		/*
		 * Test Data, Content-Type : application/json
		 *  {
		 *	  "code": "bxsd",
		 *	  "label": "Sandwich",
		 *	  "description": "A delicious Sandwich",
		 *	  "category_id": "",
		 *	  "mrp": 40,
		 *	  "vat": 5,
		 *	  "imageurls": "http://pngimg.com/upload/burger_sandwich_PNG4162.png"
		 *	}
		 **/ 
		var response = { 'result' : false, 'reason' : 'Invalid Data' };
		var reqData = req.body; var tmpData = [];
		var columnNames = ['code', 'label', 'description', 'category_id', 'mrp', 'vat', 'imageurls'];
		var nonMandatoryColumnNames = [ 'category_id', 'description' ];
		var proceed = true;
		for( var index = 0; index < 7; index++ ){
			var column = columnNames[index];
			if( reqData[ column ] != null ){
				if( column == 'imageurls' ){
					var imgJSON = { 'imageurl' : reqData[ column ], 'created' : (new Date()).toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/,'$2-$1-$3') };
					tmpData.push( "'" + JSON.stringify( imgJSON ) + "'" );
				} else {
					tmpData.push( "'" + reqData[ column ] + "'" );
				}
			} else if( nonMandatoryColumnNames.indexOf( column ) < 0 ){
				proceed = false;
				break;
			} else {
				tmpData.push( '0' );
			}
		}
		if( proceed ){
			var query = 'INSERT INTO `products` (code, label, description, category_id, mrp, vat, imageurls, created, modified) VALUES (' + tmpData.join() + ', NOW(), NOW() )';
			connection.acquire(function(err, con){
				con.query( query, function(err, result){
					con.release();
					if( err != null ){
						response = { 'result' : false, 'reason' : 'Product could not be Added Successfully.' }; 
						res.send( response );
					} else {
						response = { 'result' : true, 'reason' : 'Product Added Successfully.', 'product_id' : result.insertId }; 
						res.send( response );
					}
				});
			});
		} else {
			res.send( response );
		}
	}
}

module.exports = products;
