const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig'); // Importa la instancia de Sequelize configurada
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  repetirContraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const crearUsuario = async (nombre, email, contraseña, repetirContraseña, edad) => {
  try {
    const nuevoUsuario = await Usuario.create({ nombre, email, contraseña, repetirContraseña, edad });
    return nuevoUsuario;
  } catch (error) {
    throw error;
  }
};

// Buscar un usuario por su dirección de correo electrónico
const buscarUsuarioPorEmail = async (email) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    return usuario;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Usuario,
  crearUsuario,
  buscarUsuarioPorEmail,
  // Otros métodos CRUD según sea necesario
};