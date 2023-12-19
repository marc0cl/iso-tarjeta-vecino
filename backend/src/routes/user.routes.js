"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de usuarios */
const usuarioController = require("../controllers/user.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();


// Define las rutas para los usuarios
router.get("/", authenticationMiddleware,usuarioController.getUsers);
router.post("/", usuarioController.createUser);
router.get("/id/:id", authenticationMiddleware,usuarioController.getUserById);
router.get("/mail/:email", authenticationMiddleware, usuarioController.getUserByEmail);
router.get("/rut/:rut", authenticationMiddleware, usuarioController.getUserByRut);

router.put(
    "/id/:id",
    usuarioController.updateUserById,
);

router.put(
    "/rut/:rut",
    authorizationMiddleware.isAdmin,
    usuarioController.updateUserByRut,
);
router.put(
    "/username/application/:username",
    authorizationMiddleware.isAdmin,
    usuarioController.updateApplicationStatus,
);
router.delete(
    "/:id",
    authorizationMiddleware.isAdmin,
    usuarioController.deleteUser,
);
router.put(
    "/link/:benefitId",
    authorizationMiddleware.isUser,
    usuarioController.linkBenefitToUser);

router.put(
    "/unlink/:benefitId",
    authorizationMiddleware.isUser,
    usuarioController.unlinkBenefitFromUser);
// Ruta para vincular un formulario a un usuario
router.put("/:id/add/:idForm", usuarioController.linkFormToUser);

// Ruta para desvincular un formulario de un usuario
router.put("/:userId/rmv/:formId", usuarioController.unlinkFormFromUser);


// Exporta el enrutador
module.exports = router;
