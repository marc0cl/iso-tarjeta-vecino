"use strict";


const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// Ruta para crear un nuevo formulario
router.post("/", formController.createForm);

// Ruta para obtener una lista de todos los formularios
router.get("/",authorizationMiddleware.isAdmin, formController.getForms);

// Ruta para obtener un formulario por su ID
router.get("/:id", formController.getFormById);

// Ruta para actualizar un formulario por su ID
router.put("/:id", formController.updateForm);

// Ruta para eliminar un formulario por su ID
router.delete("/:id", formController.deleteForm);

//Ruta para agregar pregunta a formulario
router.put("/addQuestion/:id", formController.addQuestionToForm);

// Ruta para eliminar una pregunta de un formulario por su ID
router.delete("/:formId/deleteQuestion/:questionId", formController.removeQuestionFromForm);

//ruta para responder la pregunta de un formulario
router.put("/:formId/updateAnswer/:questionId",authorizationMiddleware.isUser, formController.updateAnswer);

module.exports = router;



