var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	fileName: String,
	category: String,
	price: Number,
	title: String
	
	
});

var item = mongoose.model('item', itemSchema);

module.exports = item;
