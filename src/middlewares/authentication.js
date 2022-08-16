const jwt = require('jsonwebtoken');
const config = require('../../config');
const customerAuthTokenRepository = require('../database/repositories/customerAuthTokenRepository');
const customerRepository = require('../database/repositories/customerRepository');
const AuthenticationError = require('../exceptions/AuthorizationError');

const ensureAuthenticated = async (request, response, next) => {
    const authorizationToken = request.headers.authorization;
    if (!authorizationToken) {
        throw new AuthenticationError('Authorization Token not found');
    }

    const [, token] = authorizationToken.split(' ');

    try {
        const { sub } = jwt.verify(token, config.jwt.secretKey);
        
        const authToken = await customerAuthTokenRepository.findOneByToken({ token });
        if (!authToken) {
            throw new Error('not authenticated');
        }

        const user = await customerRepository.findByUuid({ uuid: sub });
        request.user_id = user.id;

        return next();
    } catch (error) {
        throw new AuthenticationError('Invalid Authorization Token');
    }
}

module.exports = {
    ensureAuthenticated
}