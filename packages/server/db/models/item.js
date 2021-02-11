var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	image: String,
	
	
});

var item = mongoose.model('item', itemSchema);

module.exports = item;
