const userModel = require('../models/user.model');

const createUser = async (req, res) => {
  const { email, password, fullName, age } = req.body;
  try {
    // Verificar si el email ya existe en la base de datos
    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send('El correo electrónico ya está registrado. Por favor, use otro.');
    }

    // Crear el nuevo usuario
    await userModel.createUser({ email, contrasena: password, nombre_completo: fullName, edad: age });

    // Agregar log para indicar que la inserción fue exitosa
    console.log('Usuario creado exitosamente en la base de datos.');

    // Redirigir al usuario a la página de inicio de sesión
    res.redirect('/login');
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  createUser,
};
