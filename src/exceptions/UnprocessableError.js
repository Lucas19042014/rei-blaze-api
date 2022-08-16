const HttpError = require("./HttpError");

class UnprocessableError extends HttpError {
    constructor(message) {
        super(422, message);
    }
}

module.exports = UnprocessableError;