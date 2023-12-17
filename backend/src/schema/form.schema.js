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

const formIdSchema = Joi.object({
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

const updateAnswerSchema = Joi.object({
    answer: Joi.string()
    .allow('')  
    .required()
      .messages({
        "string.base": "La respuesta debe ser de tipo string."
      }),
  });

module.exports = {
    formSchema,
    questionSchema,
    formIdSchema,
    updateAnswerSchema
};

