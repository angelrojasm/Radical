const Admin = require('../models/admin');

exports.createAdmin = async (req, res) => {
	try {
		await Admin.create({
			email: req.body.email,
		});
		res.send({ eror: false });
	} catch (e) {
		res.send({ error: true, details: e });
	}
};

exports.isAdmin = async (req, res) => {
	let admin = await Admin.findOne({ email: req.query.email });
	admin === null ? res.send({ isAdmin: false }) : res.send({ isAdmin: true });
};
