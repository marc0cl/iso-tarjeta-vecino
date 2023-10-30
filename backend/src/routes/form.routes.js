"use strict";


const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller.js");

// Ruta para crear un nuevo formulario
router.post("/", formController.createForm);

// Ruta para obtener una lista de todos los formularios
router.get("/", formController.getForms);

// Ruta para obtener un formulario por su ID
router.get("/:formId", formController.getFormById);

// Ruta para actualizar un formulario por su ID
router.put("/:formId", formController.updateForm);

// Ruta para eliminar un formulario por su ID
router.delete("/:formId", formController.deleteForm);

module.exports = router;





