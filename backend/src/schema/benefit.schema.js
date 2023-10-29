"use strict";

const Joi = require("joi");


const benefitBodySchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
    }),
    description: Joi.string().required().messages({
        "string.empty": "La descripción no puede estar vacía.",
        "any.required": "La descripción es obligatoria.",
        "string.base": "La descripción debe ser de tipo string.",
    }),
    discount: Joi.number().required().messages({
        "number.empty": "El descuento no puede estar vacío.",
        "any.required": "El descuento es obligatorio.",
        "number.base": "El descuento debe ser de tipo number.",
    }),
    company: Joi.string().required().messages({
        "string.empty": "La empresa no puede estar vacía.",
        "any.required": "La empresa es obligatoria.",
        "string.base": "La empresa debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

const benefitIdSchema = Joi.object({
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

module.exports = {
    benefitBodySchema,
    benefitIdSchema,
};