// user.model.js

const pool = require('../config/db');

const createUser = async ({ email, contrasena, nombre_completo, edad }) => {
  try {
    const query = 'INSERT INTO Cliente (email, contrasena) VALUES (?, ?)';
    await pool.query(query, [email, contrasena]);

    // Obtén el ID del nuevo usuario insertado
    const { insertId } = await pool.query('SELECT LAST_INSERT_ID() as id');

    // Inserta los datos adicionales en la tabla DatosCliente
    const datosClienteQuery = 'INSERT INTO DatosCliente (cliente_id, nombre_completo, edad) VALUES (?, ?, ?)';
    await pool.query(datosClienteQuery, [insertId, nombre_completo, edad]);

    return { success: true };
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM Cliente WHERE email = ?';
  const result = await pool.query(query, [email]);
  return result[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};
