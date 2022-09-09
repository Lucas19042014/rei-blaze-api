const { Router } = require('express');
const webhookController = require('../controllers/webhookController');

const webhookRoutes = Router();
webhookRoutes.post('/webhook/kiwify', webhookController.create);

module.exports = webhookRoutes;