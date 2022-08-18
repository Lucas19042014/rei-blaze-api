const HttpError = require("../exceptions/HttpError");

const responseError = (exception, response) => {
    if (exception instanceof HttpError) {
        return response.status(exception.statusCode).json({
            code: exception.statusCode,
            message: exception.message
        });
    }

    return response.status(500).send('Server Internal Error');
}

module.exports = {
    responseError
}