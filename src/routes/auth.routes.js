// auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para el inicio de sesión
router.post('../views/login.html', authController.login);

module.exports = router;
