// models/user.model.js
const database = require('../config/db');

const createUser = async ({ email, contrasena }) => {
  try {
    const query = 'INSERT INTO Cliente (email, contrasena) VALUES (?, ?)';
    const results = await database.query(query, [email, contrasena]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM Cliente WHERE email = ?';
    const results = await database.query(query, [email]);
    return results[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
