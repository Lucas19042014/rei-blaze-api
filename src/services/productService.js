const db = require('../database');
const passwordGenerator = require('generate-password');

const userService = require('../services/userService');
const customerRepository = require('../database/repositories/customerRepository');
const customerUserLogRepository = require('../database/repositories/customerUserLogRepository');

const EXPIRE_EVENTS = [
    'PURCHASE_REFUNDED',
    'PURCHASE_EXPIRED',
    'PURCHASE_CANCELED',
    'PURCHASE_CHARGEBACK'
];

const ACTIVE_EVENTS = [
    'PURCHASE_APPROVED',
    'PURCHASE_COMPLETE'
];

const createOrUpdateCustomerUser = async (email, market) => {
    try {
        const transaction = await db.transaction();

        const tempPassword = passwordGenerator.generate({
            length: 8,
            numbers: true
        });

        const user = await userService.createUser({ email, password: tempPassword });

        if (EXPIRE_EVENTS.includes(market.event)) {
            user.expire_date = new Date();
        }

        if (ACTIVE_EVENTS.includes(market.event)) {
            user.expire_date = null;
        }

        await customerRepository.update(user, transaction);
        await customerUserLogRepository.save({
            customer_id: user.id,
            event: market.event,
            client_id: market.client_id
        }, transaction);

        await transaction.commit();

        // disparar e-mail
    } catch (error) {
        await transaction.rollback();

        console.log(error);
        throw error;
    }
    
}

module.exports = {
    createOrUpdateCustomerUser
}