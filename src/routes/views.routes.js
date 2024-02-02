const express = require("express");
const viewsController = require("../controllers/views.controller");

const viewsRouter = express.Router ();

viewsRouter.get("/alumnos", viewsController.renderAlumno);

module.exports = viewsRouter;