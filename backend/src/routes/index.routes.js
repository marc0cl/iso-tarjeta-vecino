"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

const benefitRoutes = require("./benefit.routes.js");

const formRoutes = require("./form.routes.js");

const notificationRoutes = require("./notifications.routes.js");


/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use("/benefits", benefitRoutes);

router.use("/forms", formRoutes);

router.use("/notifications", notificationRoutes);

// Exporta el enrutador
module.exports = router;
