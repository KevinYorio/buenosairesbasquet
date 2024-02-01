// sequelizeconfig.js
module.exports = {
  development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Velez1992',
      database: process.env.DB_NAME || 'buenosairesbasquet',
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
  },
  // Otras configuraciones...
}
