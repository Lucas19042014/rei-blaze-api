const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoutes = Router();
productRoutes.post('/product/webhook', productController.create);

module.exports = productRoutes;