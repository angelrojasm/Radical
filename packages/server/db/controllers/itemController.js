const Item = require('../models/item');
require('express-fileupload');
const s3 = require('../../aws/controller/s3');

exports.createItem = async (req, res) => {
	try {
		let uploaded = await s3.uploadFile(req.files.image, req.body.fileName);
		if (uploaded.error) {
			res.send({ error: true, details: uploaded.details });
		} else {
			await Item.create({
				fileName: req.body.fileName,
				title: req.body.title,
				category: req.body.category,
				price: req.body.price,
			});
			res.send({ error: false });
		}
	} catch (e) {
		console.log(e);
		res.send({ error: true, details: e });
	}
};

exports.getItem = async (req, res) => {
	try {
		let data = await Item.find();
		res.send({ error: false, items: data });
	} catch (e) {
		res.send({ error: true, details: e });
	}
};

exports.getItemById = async (req, res) => {
	try {
		let data = await Item.findById(req.query.itemId);
		res.send({ error: false, item: data });
	} catch (e) {
		res.send({ error: true, details: e });
	}
};

exports.addDesignFile = async (req, res) => {
	try {
		let uploaded = await s3.uploadDesignFile(req.files.image);
		if (uploaded.error) {
			res.send({ error: true, details: uploaded.details });
		} else {
			res.send({ error: false });
		}
	} catch (e) {
		console.log(e);
		res.send({ error: true, details: e });
	}
};

exports.deleteDesignFile = async (req, res) => {
	try {
		let deleted = await s3.deleteDesignFile(req.body.fileName);
		if (deleted.error) {
			res.send({ error: true, details: deleted.details });
		} else {
			res.send({ error: false });
		}
	} catch (e) {
		console.log(e);
		res.send({ error: true, details: e });
	}
};
