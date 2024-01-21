// auth.controller.js

const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Obtener usuario por email desde la base de datos
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(401).send('Correo electrónico o contraseña incorrectos');
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.contrasena);

    if (!passwordMatch) {
      return res.status(401).send('Correo electrónico o contraseña incorrectos');
    }

    // Autenticación exitosa
    res.redirect('/alumno.html'); // Redirigir a la página del alumno o realizar acciones necesarias
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  login,
};
