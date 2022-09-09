const customerRepository = require('../database/repositories/customerRepository');
const customerAuthTokenRepository = require('../database/repositories/customerAuthTokenRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UnprocessableError = require('../exceptions/UnprocessableError');
const config = require('../../config');

const createSession = async (sessionDTO) => {
    const user = await customerRepository.findByEmail({ email: sessionDTO.email });

    if (!user) {
        throw new UnprocessableError('Invalid Crendentials');
    }

    if (user.expire_date && user.expire_date <= new Date()) {
        throw new UnprocessableError('Invalid User');
    }

    const passwordMatched = await bcrypt.compare(sessionDTO.password, user.password);

    if (!passwordMatched) {
        throw new UnprocessableError('Invalid Crendentials');
    }

    const token = jwt.sign({}, config.jwt.secretKey, {
        expiresIn: '1d',
        subject: user.uuid
    });

    const oldTokens = await customerAuthTokenRepository.findByCustomerId({ customer_id: user.id });
    oldTokens.map(async (oldToken) => {
        oldToken.active = false;
        await customerAuthTokenRepository.update(oldToken);
    });

    await customerAuthTokenRepository.save({
        auth_token: token,
        customer_id: user.id,
    });

    delete user.password;

    return {
        token,
        expireAt: new Date(Date.now() + (60 * 60 * 24 * 1000)),
        user
    }
}

module.exports = { createSession }