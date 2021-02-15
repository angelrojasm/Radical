var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var cartItemSchema = new Schema({
	itemId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }],
	cartId: String,
	quantity: Number,
	size: String,
});

var cartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = cartItem;
