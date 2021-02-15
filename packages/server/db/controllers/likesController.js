const Likes = require('../models/likes');
const LikesItem = require('../models/likesItem');

exports.createLikes = async (req, res) => {
	try {
		await Likes.create({
			userId: req.body.userId,
		});
		res.send({ eror: false });
	} catch (e) {
		res.send({ error: true, details: e });
	}
};

exports.getLikes = async (req, res) => {
	try {
		let likes = await Likes.findOne({ userId: req.query.userId });
		let likesItems = await LikesItem.find({ likesId: likes._id }).populate('itemId');
		res.send({ error: false, content: likesItems });
	} catch (error) {
		res.send({ error: true, details: e });
	}
};

exports.addItemToLikes = async (req, res) => {
	let likes = await Likes.findOne({ userId: req.body.userId });
	if (likes === null) {
		res.send({ error: true, content: likes });
	} else {
		try {
			await LikesItem.create({
				itemId: req.body.itemId,
				likesId: likes._id,
			});
			res.send({ eror: false });
		} catch (e) {
			res.send({ error: true, details: e });
		}
	}
};

exports.removeItemFromLikes = async (req, res) => {
	let likes = await Likes.findOne({ userId: req.body.userId });
	if (likes === null) {
		res.send({ error: true, content: likes });
	} else {
		try {
			await LikesItem.deleteOne({
				itemId: req.body.itemId,
				likesId: likes._id,
			});
			res.send({ eror: false });
		} catch (e) {
			res.send({ error: true, details: e });
		}
	}
};
