"use strict";

const Joi = require("joi");
/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "El nombre de usuario no puede estar vacío.",
        "any.required": "El nombre de usuario es obligatorio.",
        "string.base": "El nombre de usuario debe ser de tipo string.",
    }),
    password: Joi.string().required().min(5).messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "any.required": "La contraseña es obligatoria.",
        "string.base": "La contraseña debe ser de tipo string.",
        "string.min": "La contraseña debe tener al menos 5 caracteres.",
    }),
    firstName: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    lastName: Joi.string().required().messages({
        "string.empty": "El apellido no puede estar vacío.",
        "any.required": "El apellido es obligatorio.",
        "string.base": "El apellido debe ser de tipo string.",
    }),
    gender: Joi.string().required().valid("male", "female",
        "APACHE HELICOPTER AH64-E", "other").messages({
        "string.empty": "El género no puede estar vacío.",
        "any.required": "El género es obligatorio.",
        "string.base": "El género debe ser de tipo string.",
        "any.only": "El género proporcionado no es válido.",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "El email no puede estar vacío.",
        "any.required": "El email es obligatorio.",
        "string.base": "El email debe ser de tipo string.",
        "string.email": "El email debe tener un formato válido.",
    }),
    location: Joi.string().required().messages({
        "string.empty": "La ubicación no puede estar vacía.",
        "any.required": "La ubicación es obligatoria.",
        "string.base": "La ubicación debe ser de tipo string.",
    }),
    residenceCertificate: Joi.string().optional(),
    userType: Joi.string().valid("residente", "visita", "administrador").messages({
        "string.base": "El tipo de usuario debe ser de tipo string.",
        "any.only": "El tipo de usuario proporcionado no es válido.",
    }),
    documentImage: Joi.string().optional(),
    applicationStatus: Joi.string().valid("aprobado", "rechazado", "apelacion").messages({
        "string.base": "El estado de la solicitud debe ser de tipo string.",
        "any.only": "El estado de la solicitud proporcionado no es válido.",
    }),
    benefits: Joi.array().items(Joi.string()).optional(),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { userBodySchema, userIdSchema };
