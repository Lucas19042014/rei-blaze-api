const userService = require('../services/userService');
const { reponseError } = require('../utils/errorUtils');

const controller = {
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