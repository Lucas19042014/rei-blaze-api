const HttpError = require("./HttpError");

class ClientError extends HttpError {
    constructor(message) {
        super(400, message);
    }
}

module.exports = ClientError;