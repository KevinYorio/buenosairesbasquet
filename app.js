import express from 'express';
import ejs from 'ejs';
import session from 'express-session';
import { connectDatabase } from './config/db.js';
import { userRoutes } from './routes/user.routes.js';

const app = express();
const pool = connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(session({
  secret: process.env.SESSION_SECRET || 'tu-secreto-seguro',
  resave: false,
  saveUninitialized: true,
}));

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
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
    // Crear un usuario de prueba
    const testUser = {
      email: 'test@example.com',
      contrasena: 'testpassword',
    };

    connection.query('INSERT INTO Cliente SET ?', testUser, (error, results) => {
      if (error) {
        console.error('Error al insertar usuario de prueba:', error);
      } else {
        console.log('Usuario de prueba insertado correctamente.');
      }

      // Liberar la conexión después de la operación
      connection.release();
    });
  }
});

app.use('/user', userRoutes);

export default app;
