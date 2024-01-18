const createUser = async ({ email, contrasena, nombre_completo, edad }) => {
  try {
    const query = 'INSERT INTO Cliente (email, contrasena) VALUES (?, ?)';
    await database.query(query, [email, contrasena]);

    // Obtén el ID del nuevo usuario insertado
    const { insertId } = await database.query('SELECT LAST_INSERT_ID() as id');

    // Inserta los datos adicionales en la tabla DatosCliente
    const datosClienteQuery = 'INSERT INTO DatosCliente (cliente_id, nombre_completo, edad) VALUES (?, ?, ?)';
    await database.query(datosClienteQuery, [insertId, nombre_completo, edad]);

    return { success: true };
  } catch (error) {
    throw error;
  }
};
