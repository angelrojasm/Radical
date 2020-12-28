var mongoose = require('mongoose');
require('../mongoose-connection');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: String,
	email: String,
	firstName: String,
	lastName: String,
	phone: String,
	street: String,
	city: String,
	sector: String,
	residency: String,
	
	
});

var user = mongoose.model('user', userSchema);

module.exports = user;
