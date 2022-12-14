const { Router } = require('express');
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middlewares/authentication');

const userRoutes = Router();

userRoutes.use(authenticationMiddleware.ensureAuthenticated);
userRoutes.post('/users', userController.create);
userRoutes.get('/users/me', userController.me);
userRoutes.post('/users/reset_password', userController.resetPassword);

module.exports = userRoutes;