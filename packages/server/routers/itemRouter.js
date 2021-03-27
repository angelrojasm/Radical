const itemController = require('../db/controllers/itemController');
const express = require('express');
const itemRouter = express.Router();

itemRouter.get('/', (req, res) => {
	itemController.getItem(req, res);
});
itemRouter.get('/find', (req, res) => {
	itemController.getItemById(req, res);
});
itemRouter.post('/', (req, res) => {
	itemController.createItem(req, res);
});
itemRouter.post('/add-design', (req, res) => {
	itemController.addDesignFile(req, res);
});
itemRouter.post('/delete-design', (req, res) => {
	itemController.deleteDesignFile(req, res);
});
module.exports = itemRouter;
