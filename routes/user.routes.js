// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Rutas
router.post('/registro', userController.createUser);

module.exports = { userRoutes: router };
