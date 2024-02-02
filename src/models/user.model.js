// user.model.js

const pool = require('../config/db');

const createUser = ({ email, contrasena, nombre_completo, edad }) => { //TODO esta linea la modifique
  try {
    const query = 'INSERT INTO Cliente (email, contrasena) VALUES (?, ?)';
    pool.query(query, [email, contrasena]);

    // Obtén el ID del nuevo usuario insertado
    const { insertId } =  pool.query('SELECT LAST_INSERT_ID() as id');

    // Inserta los datos adicionales en la tabla DatosCliente
    // ------AQUI TIENES UN ERROR DEBES CORREGIRLO -------
    const datosClienteQuery = 'INSERT INTO DatosCliente (cliente_id, nombre_completo, edad) VALUES (?, ?, ?)';
    pool.query(datosClienteQuery, [insertId, nombre_completo, edad]);

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
