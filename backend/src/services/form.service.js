"use strict";

const Form = require("../models/form.model");
const { handleError } = require("../utils/errorHandler");
const { changeStateForm } = require("./notification.service");

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
    const { title, questions, estado } = data;
    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { title, questions, estado },
      { new: true }
    );
    console.log(estado)
    if(estado == "0" || estado == "1"){
      console.log("entro")
      changeStateForm(id, estado)
    }
    if (!updatedForm) {
      return [null, "Formulario no encontrado"];
    }
    return [updatedForm, null];
  } catch (error) {
    handleError(error, "form.service -> updateForm");
    return [null, "Error al actualizar el formulario"];
  }
}

async function updateAnswer(formId, questionId, newAnswer) {
  try {
    //busca el id de formulario
    const form = await Form.findById(formId);
    if (!form) {
      return [null, "El formulario no existe"];
    }
    //se selecciona la pregunta por su id
    const questionToUpdate = form.questions.id(questionId);

    if (!questionToUpdate) {
      return [null, "La pregunta no existe en el formulario"];
    }
  //actualizamos la respuesta
    questionToUpdate.answer = newAnswer;

    await form.save();

    return [form, null];
  } catch (error) {
    console.error(error);
    return [null, "Error al actualizar la respuesta de la pregunta"];
  }
}


/* //funcion final que verifica que solo el usuario linkeado al formulario puede hacer modificaciones
//al formulario que tiene asignado.
async function updateAnswer(userId, formId, questionId, newAnswer) {
  try {
    // Verificar si el formulario pertenece al usuario
    const user = await User.findById(userId);
    if (!user) {
      return [null, "Usuario no encontrado"];
    }
  //se verifica que el id de formulario este en los formularios linkeados al usuario
    const isFormBelongsToUser = user.form.some(form => form.toString() === formId);
    if (!isFormBelongsToUser) {
      return [null, "El formulario no pertenece al usuario"];
    }

    // Continuar con la lógica de actualización
    const form = await Form.findById(formId);
    if (!form) {
      return [null, "El formulario no existe"];
    }

    const questionToUpdate = form.questions.id(questionId);
    if (!questionToUpdate) {
      return [null, "La pregunta no existe en el formulario"];
    }

    questionToUpdate.answer = newAnswer;

    await form.save();

    return [form, null];
  } catch (error) {
    console.error(error);
    return [null, "Error al actualizar la respuesta de la pregunta"];
  }
}
*/

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

async function addImageToForm(formId, image) {
  try {
      // Lógica para agregar la imagen al formulario
      const updatedForm = await Form.findByIdAndUpdate(
          formId,
          { $set: { image: image } }, // Asegúrate de asignar la imagen al campo correcto
          { new: true }
      );

      return [updatedForm, null];
  } catch (error) {
      console.error('Error al agregar imagen al formulario:', error);
      return [null, 'Error al agregar imagen al formulario'];
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
  updateAnswer,
  addImageToForm,
};
