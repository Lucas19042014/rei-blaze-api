const config = require('../../config');
const sessionService = require('../services/sessionService');
const { responseError } = require('../utils/errorUtils');


const controller = {
    create: async (request, response) => {
        try {
            const { email, password } = request.body;
            const session = await sessionService.createSession({ email, password });

            return response.status(201).json(session);
        } catch (error) {
            console.log(error);
            return responseError(error, response);
        }
    }
}

module.exports = controller