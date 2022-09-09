const config = require('../../config');
const userService = require('../services/userService');
const { responseError } = require('../utils/errorUtils');


const controller = {
    create: async (request, response) => {
        try {
            const { Customer } = request.body;
            const user = await userService.findOrCreateUserAsync({ name: Customer.full_name, email: Customer.email, cpf: Customer.CPF });

            return response.status(201).json(user);
        } catch (error) {
            console.log(error);
            return responseError(error);
        }
    }
}

module.exports = controller