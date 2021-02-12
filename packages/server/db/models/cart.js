var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
	userId: String,
	
	
});

var cart = mongoose.model('cart', cartSchema);

module.exports = cart;
