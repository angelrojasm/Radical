const likesController = require('../db/controllers/likesController')
const express = require('express')
const likesRouter = express.Router();


likesRouter.get('/', (req,res) => {likesController.getLikes(req,res)})
likesRouter.post('/',(req,res) => {likesController.createLikes(req,res)})
likesRouter.post('/add',(req,res) => {likesController.addItemToLikes(req,res)})
likesRouter.delete('/remove',(req,res) => {likesController.removeItemFromLikes(req,res)})

module.exports = likesRouter 