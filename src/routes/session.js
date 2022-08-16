const { Router } = require('express');
const sessionController = require('../controllers/sessionController');

const sessionRoutes = Router();
sessionRoutes.post('/session', sessionController.create);

module.exports = sessionRoutes;