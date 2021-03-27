var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var cartItemSchema = new Schema({
	itemId: String,
	cartId: String,
	quantity: Number,
	size: String,
	comments: String,
	price: Number,
	designType: String,
	designImage: Number,
	color: String,
});

var cartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = cartItem;
