"use strict";

const Joi = require("joi");

const questionSchema = Joi.object({
    text: Joi.string()
        .required()
        .messages({
            "string.empty": "El texto de la pregunta no puede estar vacío.",
            "any.required": "El texto de la pregunta es obligatorio.",
            "string.base": "El texto de la pregunta debe ser de tipo string.",
        }),
    answer: Joi.string().messages({
        "string.base": "La respuesta a la pregunta debe ser de tipo string.",
    }),
});

const formSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            "string.empty": "El título del formulario no puede estar vacío.",
            "any.required": "El título del formulario es obligatorio.",
            "string.base": "El título del formulario debe ser de tipo string.",
        }),
    questions: Joi.array().items(questionSchema),
});

module.exports = {
    formSchema,
};

