const HttpError = require("./HttpError");

class AuthorizationError extends HttpError {
    constructor(message) {
        super(403, message);
    }
}

module.exports = AuthorizationError;