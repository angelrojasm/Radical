const itemController = require('../db/controllers/itemController')
const express = require('express')
const itemRouter = express.Router();


itemRouter.get('/', (req,res) => {itemController.getItem(req,res)})
itemRouter.post('/',(req,res) => {itemController.createItem(req,res)})


module.exports = itemRouter 