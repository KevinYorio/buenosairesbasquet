// Importar la librería 'mysql' para la conexión con la base de datos
const mysql = require('mysql');
// Importar la función 'promisify' de la librería 'util' para convertir callbacks en promesas
const { promisify } = require('util');
// Importar la configuración de la base de datos desde el archivo 'key'
const { database } = require('./key');

// Crear un pool de conexiones utilizando la configuración de la base de datos
const pool = mysql.createPool(database);

// Intentar obtener una conexión del pool
pool.getConnection((err, connection) => {
    if (err) {
        // Manejar errores durante la conexión
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    // Si la conexión se obtiene con éxito, se libera inmediatamente
    if (connection) connection.release();
    console.log('DB is Connected');
});

// Promisify las consultas del pool para poder utilizar promesas en lugar de callbacks
pool.query = promisify(pool.query);

// Exportar el pool para su uso en otros archivos de la aplicación
module.exports = pool;