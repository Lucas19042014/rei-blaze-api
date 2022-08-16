const HttpError = require("../exceptions/HttpError");

const responseError = (exception, response) => {
    if (exception instanceof HttpError) {
        return response.status(exception.statusCode).send(exception.message);
    }

    return response.status(500);
}

module.exports = {
    responseError
}