"use strict";

const Joi = require("joi");
const ROLES = require("../constants/roles.constants");
const { validate: validateRut } = require("@validatecl/rut");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
    rut: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!validateRut(value)) {
                return helpers.error("string.invalidRut", { value });
            }
            return value;
        })
        .messages({
            "string.empty": "El rut no puede estar vacío.",
            "any.required": "El rut es obligatorio.",
            "string.base": "El rut debe ser de tipo string.",
            "string.invalidRut": "El RUT proporcionado no es válido.",
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
    gender: Joi.string().required().valid("Hombre", "Mujer",
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
    roles: Joi.array()
        .items(Joi.string().valid(...ROLES))
        .required()
        .messages({
            "array.base": "El rol debe ser de tipo array.",
            "any.required": "El rol es obligatorio.",
            "string.base": "El rol debe ser de tipo string.",
            "any.only": "El rol proporcionado no es válido.",
        }),
    documentImage: Joi.string().optional(),
    applicationStatus: Joi.string().valid("Aprobado", "Rechazado", "Apelacion", "Pendiente").messages({
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

const rutSchema = Joi.object({
    rut: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!validateRut(value).valid) {
                return helpers.error("string.invalidRut", { value });
            }
            return value; // Retornamos el valor si el RUT es válido
        })
        .messages({
            "string.empty": "El rut no puede estar vacío.",
            "any.required": "El rut es obligatorio.",
            "string.base": "El rut debe ser de tipo string.",
            "string.invalidRut": "El RUT proporcionado no es válido.",
        }),
});

module.exports = {userBodySchema, userIdSchema, rutSchema: rutSchema};
