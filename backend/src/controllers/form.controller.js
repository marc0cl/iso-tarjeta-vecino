"use strict";

const Form = require("../models/form.model");
const FormService = require("../services/form.service");
const { formSchema, formIdSchema } = require("../schema/form.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
//const {updateUser} = require("../controller.");
async function getForms(req, res) {
  try {
    const [forms, errorForms] = await FormService.getForms();
    if (errorForms) return respondError(req, res, 404, errorForms);

    forms.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, forms);
  } catch (error) {
    handleError(error, "form.controller -> getForms");
    respondError(req, res, 400, error.message);
  }
}

async function createForm(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = formSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newForm, formError] = await FormService.createForm(body);

    if (formError) return respondError(req, res, 400, formError);
    if (!newForm) {
      return respondError(req, res, 400, "No se creó el formulario");
    }

    respondSuccess(req, res, 201, newForm);
  } catch (error) {
    console.log(error);
    handleError(error, "form.controller -> createForm");
    respondError(req, res, 500, "No se creó el formulario");
  }
}

async function getFormById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [form, errorForm] = await FormService.getFormById(params.id);
    if (errorForm) return respondError(req, res, 404, errorForm);

    respondSuccess(req, res, 200, form);
  } catch (error) {
    handleError(error, "form.controller -> getFormById");
    respondError(req, res, 400, error.message);
  }
}

async function updateForm(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = formIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = formSchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [form, errorForm] = await FormService.updateForm(params.id, body);
    if (errorForm) return respondError(req, res, 404, errorForm);

    respondSuccess(req, res, 200, form);
  } catch (error) {
    handleError(error, "form.controller -> updateForm");
    respondError(req, res, 400, error.message);
  }
}

async function deleteForm(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = formIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [form, errorForm] = await FormService.deleteForm(params.id);
    if (errorForm) return respondError(req, res, 404, errorForm);

    respondSuccess(req, res, 200, form);
  } catch (error) {
    handleError(error, "form.controller -> deleteForm");
    respondError(req, res, 400, error.message);
  }
}

async function addQuestionToForm(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = formIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { text, answer } = body;

    const [form, errorForm] = await FormService.addQuestionToForm(params.id, { text, answer });

    if (errorForm) return respondError(req, res, 404, errorForm);

    respondSuccess(req, res, 200, form);
  } catch (error) {
    handleError(error, "form.controller -> addQuestionToForm");
    respondError(req, res, 400, error.message);
  }
}

async function removeQuestionFromForm(req, res) {
    try {
      const { params } = req;
      const { formId, questionId } = params;
  
      // Llama a tu servicio para eliminar la pregunta
      const [form, errorForm] = await FormService.removeQuestionFromForm(formId, questionId);
  
      if (errorForm) return respondError(req, res, 404, errorForm);
  
      respondSuccess(req, res, 200, form);
    } catch (error) {
      handleError(error, "form.controller -> removeQuestionFromForm");
      respondError(req, res, 400, error.message);
    }
  }

module.exports = {
  getForms,
  createForm,
  getFormById,
  updateForm,
  deleteForm,
  addQuestionToForm,
  removeQuestionFromForm,
};
