var mongoose = require('mongoose');
require('./mongoose-connection');
var Schema = mongoose.Schema;

var modelSchema = new Schema({
	title: String, // String is shorthand for {type: String}
	author: String,
	body: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs: Number,
	},
});

var sample = mongoose.model('sampleModel', modelSchema);

module.exports = sample;
