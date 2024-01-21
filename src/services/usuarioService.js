const Usuario = require('../models/usuarios');

const crearUsuario = async (nombre, email) => {
  try {
    const nuevoUsuario = await Usuario.create({ nombre, email });
    return nuevoUsuario;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearUsuario,
  // Otros métodos CRUD según sea necesario
};
