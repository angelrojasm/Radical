const Order = require('../models/order')
const CartController = require('./cartController')

exports.createOrder = async(req,res) => {
    let currDate = new Date()
    try {
        await Order.create({userId: req.body.userId, total: req.body.total,  date: currDate})
        res.send({error: false})
    } catch (e) {
        console.log(e)
        res.send({error: true, details: e})
    }
}

exports.getOrders = async(req,res) => {
    try {
        let orders = await Order.find().sort({date: -1})
        res.send({error: false, images: orders})
    } catch (e) {
        res.send({error: true, details: e})
    }
}

exports.getOrderItems = async(req,res) => {
        await CartController.getCart(req,res)
    }