module.exports = {
    database: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    jwt: {
        secretKey: process.env.JWT_SECRET,
    }
}