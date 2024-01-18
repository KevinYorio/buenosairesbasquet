const mysql = require('mysql2');

const connectDatabase = () => {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'kevin',
    password: 'Velez1992',
    database: 'buenosairesbasquet',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Manejo de errores durante la conexión
  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('La conexión a la base de datos fue cerrada.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('La base de datos tiene demasiadas conexiones.');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('La conexión a la base de datos fue rechazada.');
      }
    }
    if (connection) {
      connection.release();
    }
    return;
  });

  return pool;
}

module.exports = { connectDatabase };
