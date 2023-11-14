"use strict";

const Form = require("../models/form.model");
const { handleError } = require("../utils/errorHandler");

async function createForm(data) {
  try {
    const { title, questions } = data;
    const newForm = new Form({
      title,
      questions,
    });
    const createdForm = await newForm.save();
    return [createdForm, null];
  } catch (error) {
    handleError(error, "form.service -> createForm");
    return [null, "Error al crear el formulario"];
  }
}

async function getForms() {
  try {
    const forms = await Form.find();
    return [forms, null];
  } catch (error) {
    handleError(error, "form.service -> getForms");
    return [null, "Error al obtener los formularios"];
  }
}

async function getFormById(id) {
  try {
    const form = await Form.findById(id);
    if (!form) {
      return [null, "Formulario no encontrado"];
    }
    return [form, null];
  } catch (error) {
    handleError(error, "form.service -> getFormById");
    return [null, "Error al obtener el formulario"];
  }
}

async function updateForm(id, data) {
  try {
    const { title, questions } = data;
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, questions },
      { new: true }
    );
    if (!updatedForm) {
      return [null, "Formulario no encontrado"];
    }
    return [updatedForm, null];
  } catch (error) {
    handleError(error, "form.service -> updateForm");
    return [null, "Error al actualizar el formulario"];
  }
}

async function deleteForm(id) {
  try {
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return [null, "Formulario no encontrado"];
    }
    return ["Formulario eliminado con éxito", null];
  } catch (error) {
    handleError(error, "form.service -> deleteForm");
    return [null, "Error al eliminar el formulario"];
  }
}

async function addQuestionToForm(id, question) {
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { $push: { questions: question } },
      { new: true }
    );
    if (!updatedForm) {
      return [null, "Formulario no encontrado"];
    }
    return [updatedForm, null];
  } catch (error) {
    handleError(error, "form.service -> addQuestionToForm");
    return [null, "Error al agregar la pregunta al formulario"];
  }
}

async function removeQuestionFromForm(formId, questionId) {
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );
    if (!updatedForm) {
      return [null, "Formulario no encontrado"];
    }
    return [updatedForm, null];
  } catch (error) {
    handleError(error, "form.service -> removeQuestionFromForm");
    return [null, "Error al eliminar la pregunta del formulario"];
  }
}

module.exports = {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
  addQuestionToForm,
  removeQuestionFromForm,
};
