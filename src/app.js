const express = require('express');
const pool = require('./config/db');
const ejs = require('ejs');
const session = require('express-session');
const { connectDatabase } = require('./config/db.js');
const userRoutes = require('./routes/user.routes.js');
const authController = require('./controllers/auth.controller'); // Importa el controlador de autenticación
const viewsRouter = require('./routes/views.routes.js');
//const { MercadoPagoConfig, Payment } = require('mercadopago'); esta linea la comente por que me tiro un error apenas inicie el proyecto

const app = express();
pool;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));
app.set('views', 'src/views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(session({
  secret: process.env.SESSION_SECRET || 'tu-secreto-seguro',
  resave: false,
  saveUninitialized: true,
}));

// Rutas de autenticación
app.post('/auth/login', authController.login);

// Rutas de usuario
app.use('/user', userRoutes);
app.use('/', viewsRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
