const likesController = require('../db/controllers/likesController')
const express = require('express')
const likesRouter = express.Router();


likesRouter.get('/', (req,res) => {likesController.getCart(req,res)})
likesRouter.post('/',(req,res) => {likesController.createCart(req,res)})
likesRouter.post('/add',(req,res) => {likesController.addItemToCart(req,res)})
likesRouter.post('/remove',(req,res) => {likesController.removeItemFromCart(req,res)})
likesRouter.post('/clear',(req,res) => {likesController.clearCart(req,res)})

module.exports = likesRouter 