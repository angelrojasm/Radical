var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    userId: String,
    total: Number,
    date: Date
	
	
});

var order = mongoose.model('order', orderSchema);

module.exports = order;
