const productService = require('../services/productService');
const clientService = require('../services/clientService');
const { responseError } = require('../utils/errorUtils');


const controller = {
    create: async (request, response) => {
        try {
            const { data: { buyer }, event, hottok } = request.body;
            const { client_id: clientToken } = request.query;

            const client = await clientService.validate(clientToken);
            await productService.createOrUpdateCustomerUser(buyer.email, { event, client_id: client.id });

            return response.status(200).json({ message: 'webhook processed successfully' });
        } catch (error) {
            console.log(error);
            return responseError(error, response);
        }
    }  
}

module.exports = controller