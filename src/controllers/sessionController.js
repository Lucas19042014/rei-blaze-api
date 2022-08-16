const config = require('../../config');
const sessionService = require('../services/sessionService');
const { responseError } = require('../utils/errorUtils');


const controller = {
    create: async (request, response) => {
        try {
            const { email, password } = request.body;
            const session = await sessionService.createSession({ email, password });

            return response.json(session);
        } catch (error) {
            return responseError(error);
        }
    }
}

module.exports = controller