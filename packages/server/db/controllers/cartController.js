const Cart = require('../models/cart')
const CartItem = require('../models/cartItem')

exports.createCart = async(req,res) => {
    console.log(req.body)
    try {
        await Cart.create({
            userId: req.body.userId,
        })
        res.send({eror: false})
    }
    catch(e) {
        res.send({error: true, details: e})
    }
}

exports.getCart = async(req,res) => {
    let cart = await Cart.findOne({userId: req.query.userId}) 
    if(cart === null) {
        res.send({error: true, content: cart})
    }
        else {
            let cartItems = await CartItem.find({cartId: cart._id})
            if(cartItems === null) {
                res.send({error: true, content: cartItems})
            }
            else {

                res.send({error: false, content: cartItems})
            }
        }
}


exports.addItemToCart = async(req,res) => {
    let cart = await Cart.findOne({userId: req.body.userId}) 
    if(cart === null) {
        res.send({error: true, content: cart})
    }
        else {
            try {
                await CartItem.create({
                   itemId: req.body.itemId,
                   cartId: cart._id
                })
                res.send({eror: false})
            }
            catch(e) {
                res.send({error: true, details: e})
            }
        }
}

exports.removeItemFromCart = async(req,res) => {
    let cart = await Cart.findOne({userId: req.body.userId}) 
    if(cart === null) {
        res.send({error: true, content: cart})
    }
        else {
            try {
                await CartItem.deleteOne({
                   itemId: req.body.itemId,
                   cartId: cart._id
                })
                res.send({eror: false})
            }
            catch(e) {
                res.send({error: true, details: e})
            }
        }
}

exports.clearCart = async(req,res) => {
    let cart = await Cart.findOne({userId: req.body.userId}) 
    if(cart === null) {
        res.send({error: true, content: cart})
    }
        else {
            try {
                await CartItem.deleteMany({
                   cartId: cart._id
                })
                res.send({eror: false})
            }
            catch(e) {
                res.send({error: true, details: e})
            }
        }
}