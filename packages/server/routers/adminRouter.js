const adminController = require('../db/controllers/adminController');
const express = require('express');
const adminRouter = express.Router();

adminRouter.get('/verify', (req, res) => {
	adminController.isAdmin(req, res);
});
adminRouter.post('/', (req, res) => {
	adminController.createAdmin(req, res);
});

module.exports = adminRouter;
