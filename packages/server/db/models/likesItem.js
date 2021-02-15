var mongoose = require('mongoose');
require('../index');
var Schema = mongoose.Schema;

var likesItemSchema = new Schema({
	likesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }],
	itemId: String,
});

var likesItem = mongoose.model('likesItem', likesItemSchema);

module.exports = likesItem;
