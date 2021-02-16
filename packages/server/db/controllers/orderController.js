const Order = require('../models/order');
const CartController = require('./cartController');
const nodeMailer = require('nodemailer');
const s3 = require('../../aws/controller/s3');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Item = require('../models/item');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
	let currDate = new Date();
	try {
		await Order.create({
			userId: req.body.userId,
			total: req.body.total,
			date: currDate,
			items: req.body.items,
		});
		res.send({ error: false });
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

exports.emailOrderInfo = async (req, res) => {
	let cart = await Cart.findOne({ userId: req.body.userId });
	let cartItems = await CartItem.find({ cartId: cart._id });
	let itemsArray = [];
	for (const item of cartItems) {
		itemsArray.push(await Item.findById(item.itemId));
	}

	let orderInfo = [];
	for (let i = 0; i < itemsArray.length; i++) {
		orderInfo.push({
			imageBuffer: 'http://du9yuz2ex8zdk.cloudfront.net/' + itemsArray[i].fileName,
			size: cartItems[i].size,
		});
	}

	const transporter = nodeMailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'watuchiha@gmail.com',
			pass: process.env.gmail_password,
		},
	});

	//generate html
	let html = '<h1>New Order! no downloading btw</h1>';

	for (let i = 0; i < orderInfo.length; i++) {
		html += `
    <h3>Item #${i + 1}<h3>
    <img height="400" width="250" src="${orderInfo[i].imageBuffer}"/>
    <p>replace with item name: ${itemsArray[i].fileName}</p>
    <p>Size: ${cartItems[i].size}</p>
    `;
	}
	const mailOptions = {
		from: 'watuchiha@gmail.com',
		to: 'angelrojasm6@gmail.com',
		subject: 'Sending Email using Node.js',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.send(error);
		} else {
			res.send(info);
		}
	});
};
