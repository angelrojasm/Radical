var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var likesSchema = new Schema({
	userId: String,
	
	
});

var likes = mongoose.model('likes', likesSchema);

module.exports = likes;
