const { Router } = require('express');
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authentication');

const userRoutes = Router();

userRoutes.use(authenticationMiddleware.ensureAuthenticated);
userRoutes.get('/users/me', userController.me);

module.exports = userRoutes;