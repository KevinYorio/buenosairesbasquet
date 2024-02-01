// key.js
module.exports = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'kevin',
        password: process.env.DB_PASSWORD || 'Velez1992',
        database: process.env.DB_NAME || 'buenosairesbasquet',
    }
}
