const orderController = require('../db/controllers/orderController')
const express = require('express')
const orderRouter = express.Router();


orderRouter.get('/history', (req,res) => {orderController.getOrders(req,res)})
orderRouter.get('/items', (req,res) => {orderController.getOrderItems(req,res)})
orderRouter.post('/',(req,res) => {orderController.createOrder(req,res)})


module.exports = orderRouter 