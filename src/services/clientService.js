
const ClientError = require('../exceptions/ClientError');
const clientRepository = require('../database/repositories/clientRepository');

const validate = async (clientToken) => {
    try {
        if (!clientToken) { 
            throw new Error('Client id not received');
        }

        const client = await clientRepository.findOneByToken({ token: clientToken });
        if (!client) {
            throw new Error('Client is not found');
        }

        return client;
    } catch (error) {
        console.log(error);
        throw new ClientError('Invalid Client Token');
    }
}

module.exports = {
    validate
}