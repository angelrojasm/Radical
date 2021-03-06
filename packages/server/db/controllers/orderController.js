const Order = require('../models/order');
const CartController = require('./cartController');
const nodeMailer = require('nodemailer');

exports.createOrder = async (req, res) => {
	let currDate = new Date();
	try {
		if (req.body.userId) {
			await Order.create({
				userId: req.body.userId,
				total: req.body.total,
				date: currDate,
				paymentMethod: req.body.method,
			});
		} else {
			await Order.create({
				total: req.body.total,
				date: currDate,
				paymentMethod: req.body.method,
			});
		}
		emailOrderInfo(req, res);
	} catch (e) {
		console.log(e);
		res.send({ error: true, details: e });
	}
};

exports.getOrders = async (req, res) => {
	try {
		let orders = await Order.find().sort({ date: -1 });
		res.send({ error: false, images: orders });
	} catch (e) {
		res.send({ error: true, details: e });
	}
};

exports.getOrderItems = async (req, res) => {
	await CartController.getCart(req, res);
};

const emailOrderInfo = (req, res) => {
	var mailOptions;
	let userData = JSON.parse(req.body.billingInfo);
	let cartItems = JSON.parse(req.body.products);
	let itemsArray = [];
	for (const item of cartItems) {
		let x = item.data;
		x.fileName = 'http://du9yuz2ex8zdk.cloudfront.net/' + x.fileName;
		itemsArray.push(x);
	}

	const transporter = nodeMailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'watuchiha@gmail.com',
			pass: process.env.gmail_password,
		},
	});

	//generate html
	let html = `
	<h1>
		New Order!
	</h1>
	<h2>Client Details:</h2>
		<h3>Client: <span>${userData.name}</span></h3>
		<h3>Email: <span>${userData.email}</span></h3>
		<h3>Phone: <span>${userData.phone}</span></h3>
		<h3>Address:</h3>
			<p>${userData.residency}, ${userData.street}, ${userData.sector}. ${userData.city}</p>
		<h3>Order Type: ${req.body.shippingMethod}
	<h2>Order Details:</h2>

	`;

	for (let i = 0; i < itemsArray.length; i++) {
		html += `
    <h2>Item #${i + 1}</h2>
    <img height="400" width="250" src="${itemsArray[i].fileName}"/>
    <p>${itemsArray[i].title}</p>
	<p>Quantity: ${cartItems[i].quantity}</p>
    <p>Size: ${cartItems[i].size}</p>
    `;
	}
	html += `<h3>Order Total: ${req.body.total}</h3>`;

	html += `Payment Method: ${req.body.paymentMethod}`;
	if (req.body.paymentMethod === 'transfer') {
		html += `
		<h2>Payment Receipt:</h2>
		`;
	}

	if (req.body.paymentMethod === 'transfer') {
		mailOptions = {
			from: 'watuchiha@gmail.com',
			to: 'angelrojasm6@gmail.com',
			subject: 'Sending Email using Node.js',
			html: html,
			attachments: {
				filename: req.files.image.name,
				cid: 'image',
				content: req.files.image.data,
			},
		};
	} else {
		mailOptions = {
			from: 'watuchiha@gmail.com',
			to: 'angelrojasm6@gmail.com',
			subject: 'Sending Email using Node.js',
			html: html,
		};
	}
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.send({ error: true, details: error });
		} else {
			res.send({ error: false });
		}
	});
};
