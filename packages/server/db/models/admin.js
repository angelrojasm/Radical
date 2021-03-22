var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
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

var admin = mongoose.model('admin', adminSchema);

module.exports = admin;
