const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');

exports.createCart = async (req, res) => {
	try {
		await Cart.create({
			userId: req.body.userId,
		});
		res.send({ eror: false });
	} catch (e) {
		res.send({ error: true, details: e });
	}
};

exports.getCart = async (req, res) => {
	try {
		let cart = await Cart.findOne({ userId: req.query.userId });
		let cartItems = await CartItem.find({ cartId: cart._id });
		res.send({ error: false, content: cartItems });
	} catch (error) {
		res.send({ error: true, details: e });
	}
};

exports.addItemToCart = async (req, res) => {
	let cart = await Cart.findOne({ userId: req.body.userId });
	if (cart === null) {
		res.send({ error: true, content: cart });
	} else {
		try {
			let x = await updateCartItemQuantity(cart._id, req.body.itemId, req.body.size);
			if (x === null) {
				await CartItem.create({
					itemId: req.body.itemId,
					cartId: cart._id,
					quantity: req.body.quantity,
					size: req.body.size,
				});
			}
			res.send({ eror: false });
		} catch (e) {
			res.send({ error: true, details: e });
		}
	}
};

exports.removeItemFromCart = async (req, res) => {
	let cart = await Cart.findOne({ userId: req.body.userId });
	if (cart === null) {
		res.send({ error: true, content: cart });
	} else {
		try {
			await CartItem.deleteOne({
				itemId: req.body.itemId,
				cartId: cart._id,
			});
			res.send({ eror: false });
		} catch (e) {
			res.send({ error: true, details: e });
		}
	}
};

exports.clearCart = async (req, res) => {
	let cart = await Cart.findOne({ userId: req.body.userId });
	if (cart === null) {
		res.send({ error: true, content: cart });
	} else {
		try {
			await CartItem.deleteMany({
				cartId: cart._id,
			});
			res.send({ eror: false });
		} catch (e) {
			res.send({ error: true, details: e });
		}
	}
};

const getCartItem = async (cartId, itemId) => {
	return await CartItem.findOne({ cartId: cartId, itemId: itemId });
};

const updateCartItemQuantity = async (cartId, itemId, size) => {
	return await CartItem.findOneAndUpdate(
		{ cartId: cartId, itemId: itemId, size: size },
		{ $inc: { quantity: 1 } }
	);
};
