// sequelizeconfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Velez1992',
  database: process.env.DB_NAME || 'buenosairesbasquet',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
