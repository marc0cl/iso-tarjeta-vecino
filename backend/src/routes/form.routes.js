"use strict";

const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

router.use(authenticationMiddleware);

// Ruta para crear un nuevo formulario
router.post("/api/forms", formController.createForm);

// Ruta para obtener una lista de todos los formularios
router.get("/api/forms", formController.getForms);

// Ruta para obtener un formulario por su ID
router.get("/api/forms/:formId", formController.getFormById);

// Ruta para actualizar un formulario por su ID
router.put("/api/forms/:formId", formController.updateForm);

// Ruta para eliminar un formulario por su ID
router.delete("/api/forms/:formId", formController.deleteForm);

// Ruta para agregar una pregunta a un formulario
router.post("/api/forms/:formId/questions", formController.addQuestionToForm);

// Ruta para eliminar una pregunta de un formulario
router.delete("/api/forms/:formId/questions/:questionId", formController.removeQuestionFromForm);

module.exports = router;




