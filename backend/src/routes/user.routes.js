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

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware.verifyJWT);

// Define las rutas para los usuarios
router.get("/", usuarioController.getUsers);
router.post("/", authorizationMiddleware.isAdmin, usuarioController.createUser);
router.get("/id/:id", usuarioController.getUserById);
router.get("/username/:username", usuarioController.getUserByUsername);

router.put(
  "/id/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.updateUserById,
);
router.put(
    "/username/:username",
    authorizationMiddleware.isAdmin,
    usuarioController.updateUserByUsername,
);
router.delete(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.deleteUser,
);
router.put(
  "/:id", usuarioController.linkBenefitToUser);

// Exporta el enrutador
module.exports = router;
