"use strict";
// Controlador para crear un nuevo formulario
exports.createForm = async (req, res) => {
  try {
      const { title, questions } = req.body;
      const newForm = new Form({
          title,
          questions,
      });
      const createdForm = await newForm.save();
      res.status(201).json(createdForm);
  } catch (err) {
      res.status(500).json({ error: "Error al crear el formulario" });
  }
};

// Controlador para obtener una lista de todos los formularios
exports.getForms = async (req, res) => {
  try {
      const forms = await Form.find();
      res.json(forms);
  } catch (err) {
      res.status(500).json({ error: "Error al obtener los formularios" });
  }
};

// Controlador para obtener un formulario por su ID
exports.getFormById = async (req, res) => {
  try {
      const formId = req.params.formId;
      const form = await Form.findById(formId);
      if (!form) {
          res.status(404).json({ error: "Formulario no encontrado" });
      } else {
          res.json(form);
      }
  } catch (err) {
      res.status(500).json({ error: "Error al obtener el formulario" });
  }
};

// Controlador para actualizar un formulario por su ID
exports.updateForm = async (req, res) => {
  try {
      const formId = req.params.formId;
      const { title, questions } = req.body;
      const updatedForm = await Form.findByIdAndUpdate(
          formId,
          { title, questions },
          { new: true }
      );
      if (!updatedForm) {
          res.status(404).json({ error: "Formulario no encontrado" });
      } else {
          res.json(updatedForm);
      }
  } catch (err) {
      res.status(500).json({ error: "Error al actualizar el formulario" });
  }
};

// Controlador para eliminar un formulario por su ID
exports.deleteForm = async (req, res) => {
  try {
      const formId = req.params.formId;
      const deletedForm = await Form.findByIdAndDelete(formId);
      if (!deletedForm) {
          res.status(404).json({ error: "Formulario no encontrado" });
      } else {
          res.json({ message: "Formulario eliminado con éxito" });
      }
  } catch (err) {
      res.status(500).json({ error: "Error al eliminar el formulario" });
  }
};

// Controlador para agregar una pregunta a un formulario
exports.addQuestionToForm = async (req, res) => {
  try {
      const formId = req.params.formId;
      const { text, answer } = req.body;
      const updatedForm = await Form.findByIdAndUpdate(
          formId,
          { $push: { questions: { text, answer } } },
          { new: true }
      );
      if (!updatedForm) {
          res.status(404).json({ error: "Formulario no encontrado" });
      } else {
          res.json(updatedForm);
      }
  } catch (err) {
      res.status(500).json({ error: "Error al agregar la pregunta al formulario" });
  }
};

// Controlador para eliminar una pregunta de un formulario
exports.removeQuestionFromForm = async (req, res) => {
  try {
      const formId = req.params.formId;
      const questionId = req.params.questionId;
      const updatedForm = await Form.findByIdAndUpdate(
          formId,
          { $pull: { questions: { _id: questionId } } },
          { new: true }
      );
      if (!updatedForm) {
          res.status(404).json({ error: "Formulario no encontrado" });
      } else {
          res.json(updatedForm);
      }
  } catch (err) {
      res.status(500).json({ error: "Error al eliminar la pregunta del formulario" });
  }
};



module.exports = {
  createForm,  
  getForms,
  getFormById,
  updateForm,
  deleteForm,
  addQuestionToForm,
  removeQuestionFromForm,
};


