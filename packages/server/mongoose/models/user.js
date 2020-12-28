var mongoose = require('mongoose');
require('../mongoose-connection');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: String, // String is shorthand for {type: String}
	street: String,
	city: String,
	sector: String,
	residency: String,
	
	
});

var user = mongoose.model('user', userSchema);

module.exports = user;
