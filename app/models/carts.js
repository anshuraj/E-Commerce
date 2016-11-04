var connection = require('../connection');

var carts = {
	getWishlist: function(res){
	
	},
	/**
	* Post Paramm
	*{
	*  "userId" : "6",
	*  "productData" : [{
	*   "productId" : "1",
	*  "quantity"  : "5",
	*   "status"    : "2"
	* },{
	*   "productId" : "3",
	*   "quantity"  : "2",
	*   "status"    : "1"
	* }]
	*}
	* */
	add: function( req, res ) {
		var reqData = req.body;
		var userId = reqData.userId;
		var dateObj = new Date();
		var currentDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObj.getDate()).slice(-2);
		var productIds = []; var tmpData = {};
		for( var i in reqData.productData ){
			productIds.push( reqData.productData[i].productId );
			tmpData[ reqData.productData[i].productId ] = { 'user_id' : userId, 'product_id' : reqData.productData[i].productId, 'quantity' : reqData.productData[i].quantity, 'status' : reqData.productData[i].status, 'created' : currentDate, 'modified' : currentDate };
		}
		connection.acquire(function(err, con){
			con.query( 'SELECT * FROM `wishlists` WHERE `product_id` IN ('+productIds.join()+') AND `user_id` = '+userId+'', function(error, wishlistData ){
				if( error == null ){
					var updateQuery = '';
					var saveQuery = '';
					if( wishlistData.length > 0 ){
						var caseStatus = ' `status` = CASE ';  var updateIds = [];
						var caseQuantity = ' `quantity` = CASE '; 
						var caseModified = ' `modified` = CASE ';
						var caseCount = ' `count` = CASE ';
						for( j in wishlistData ){
							var wId = wishlistData[j]['id'];
							var pId = wishlistData[j]['product_id'];
							var newCount = wishlistData[j].count + 1;
							var updateData = tmpData[pId];
							caseStatus += ' WHEN `id` = '+wId+' THEN "'+updateData.status+'" ';
							caseQuantity += ' WHEN `id` = '+wId+' THEN "'+updateData.quantity+'" ';
							caseModified += ' WHEN `id` = '+wId+' THEN "'+updateData.modified+'" ';
							caseCount += ' WHEN `id` = '+wId+' THEN "'+ newCount +'" ';
							updateIds.push( wId );
							delete tmpData[pId];
						}
						caseStatus += 'END';
						caseQuantity += 'END';
						caseModified += 'END';
						caseCount += 'END';
						updateQuery = 'UPDATE `wishlists` SET '+caseStatus+','+caseQuantity+','+caseModified+', '+caseCount+' WHERE `id` IN ('+updateIds.join()+')';
					}
					if( Object.keys( tmpData ).length != 0 ){
						var saveQuery = 'INSERT INTO `wishlists` (`user_id`,`product_id`,`quantity`,`status`,`created`,`modified`) VALUES ';
						for( i in tmpData ){
							var joinArr = [ '"'+tmpData[i].user_id+'"', '"'+tmpData[i].product_id+'"',
											'"'+tmpData[i].quantity+'"', '"'+tmpData[i].status+'"',
											'"'+tmpData[i].created+'"', '"'+tmpData[i].modified+'"'];
							saveQuery += '('+ joinArr.join() + '),';
						}
						saveQuery = saveQuery.substring( 0, saveQuery.length - 1 );
					}
					var queries = [];
					if( saveQuery != '' ){
						queries.push(saveQuery);
					}
					if( updateQuery != '' ){
						queries.push( updateQuery );
					}
					connection.bulkQuery(queries, function( er, result ){;
						var response = {};
						if( er == null ){
							response = { 'result' : false, 'reason' : 'Wishlist Successfully Saved.'};
						} else {
							response = { 'result' : false, 'reason' : 'Please try again!'};
						}
						res.send( response );
					});
				} else {
					var response = { 'result' : false, 'reason' : 'Error!! Please try again after some time.'};
					res.send( response );
				}
			});
		});
	}
}

module.exports = carts;
