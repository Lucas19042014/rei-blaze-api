class HttpError extends Error {
    constructor(statusCode = 500, message) {
        super(message);
        
        this.statusCode = statusCode;
    }
}

module.exports = HttpError;