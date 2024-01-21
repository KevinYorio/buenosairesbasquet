const app = require('../app');
const { sequelize } = require('./config/sequelizeConfig');
const config = require('./key');

const main = async () => {
  try {
    // Verificar la conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar los modelos con la base de datos
    await sequelize.sync();

    app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000');
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
  }
};

main();
