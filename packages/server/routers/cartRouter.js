const cartController = require('../db/controllers/cartController')
const express = require('express')
const cartRouter = express.Router();


cartRouter.get('/', (req,res) => {cartController.getCart(req,res)})
cartRouter.post('/',(req,res) => {cartController.createCart(req,res)})
cartRouter.post('/add',(req,res) => {cartController.addItemToCart(req,res)})
cartRouter.post('/remove',(req,res) => {cartController.removeItemFromCart(req,res)})
cartRouter.post('/clear',(req,res) => {cartController.clearCart(req,res)})

module.exports = cartRouter 