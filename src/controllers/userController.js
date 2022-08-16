const userService = require('../services/userService');
const { reponseError } = require('../utils/errorUtils');

const controller = {
    create: async (request, response) => {
        const { email, password, name } = request.body;

        const user = await userService.createUser({ name, email, password });
        
        return response.status(201).json(user);
    },
    me: async (request, response) => {
        try {
            const user_id = request.user_id;
            const user = await userService.getUser(user_id);

            return response.status(200).json(user)
        } catch (error) {
            console.log(error);
            return responseError(error, response);
        }
    }
}



module.exports = controller