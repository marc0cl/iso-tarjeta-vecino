"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const Benefit = require("../models/benefit.model.js");
const Form = require("../models/form.model.js");
const { handleError } = require("../utils/errorHandler");
const cron = require("node-cron");
const jwt = require('jsonwebtoken');
const { request } = require("express");
const { notificationChangeStatus } = require("./notification.service.js");

const { createForm } = require('./form.service');


/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers() {
  try {
    const users = await User.find()
      .select("-password")
      .populate("roles")
      .exec();
    if (!users) return [null, "No hay usuarios"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createUser(user) {
  try {
    const {
      rut,
      password,
      firstName,
      lastName,
      gender,
      email,
      location,
      residenceCertificate,
      userType,
      documentImage,
      applicationStatus,
      roles,
    } = user;

    const userFound = await User.findOne({ email: user.email });
    if (userFound) return [null, "El usuario ya existe"];

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];
    const myRole = rolesFound.map((role) => role._id);

    const newUser = new User({
      rut,
      password: await User.encryptPassword(password),
      firstName,
      lastName,
      gender,
      email,
      location,
      residenceCertificate,
      userType,
      documentImage,
      applicationStatus,
      roles: myRole,
    });
    await newUser.save();

  

    const [newForm, formError] = await createForm({
      title: "Formulario de postulacion", 
      questions: [
        { text: "Pregunta 1", answer: "" },
        { text: "Pregunta 2", answer: "" },
        { text: "Pregunta 3", answer: "" },
        { text: "Pregunta 4", answer: "" },
      ],
      //user: newUser._id,
      estado: -1,
    });

    newForm.user = newUser._id;
    newForm.estado = -1;
    await newForm.save();
    
    newUser.form.push(newForm._id);
    await newUser.save();

    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserById(id) {
  try {
    const user = await User.findById({ _id: id })
      .select("-password")
      .populate("roles")
      .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} rut nombre del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserByRut(rut) {
  try {
    const user = await User.findOne({ rut: rut })
        .select("-password")
        .populate("roles")
        .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByRut");
  }
}

/**
 * Obtiene un usuario por su correo electrónico de la base de datos
 * @param {string} email Correo electrónico del usuario
 * @returns {Promise} Promesa con el objeto de usuario o un mensaje de error
 */
async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email })
        .select("-password")
        .populate("roles")
        .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByEmail");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUserById(id, user) {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return [null, "El usuario no existe"];

    const { rut, email, password, newPassword, roles } = user;

    const matchPassword = await User.comparePassword(
      password,
      userFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const myRole = rolesFound.map((role) => role._id);

    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        rut,
        email,
        password: await User.encryptPassword(newPassword || password),
        roles: myRole,
      },
      { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} rut Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUserByRut(rut, user) {
  try {
    const userFound = await User.findOne({ rut: rut });
    if (!userFound) return [null, "El usuario no existe"];

    const { rut: newRut, email, password, newPassword, roles } = user;

    const matchPassword = await User.comparePassword(
        password,
        userFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const myRole = rolesFound.map((role) => role._id);

    const userUpdated = await User.findOneAndUpdate(
        { rut: rut },
        {
          rut: newRut || rut,
          email,
          password: await User.encryptPassword(newPassword || password),
          roles: myRole,
        },
        { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateUserByRut");
  }
}

/**
 * Actualiza un estado de usuario por su rut en la base de datos
 * @param {string} rut Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateApplicationStatusByRut(rut, user) {
  try {
    const userFound = await User.findOne({ rut: rut });
    if (!userFound) return [null, "El usuario no existe"];

    const { password, applicationStatus } = user;

    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const userUpdated = await User.findOneAndUpdate(
        { rut: rut },
        { applicationStatus },
        { new: true },
    );

    notificationChangeStatus(userUpdated);

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateApplicationStatusByRut");
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

async function linkBenefitToUser(req, benefitId) {
  try {
    const headers = req.headers.authorization.split(' ');
    if (headers.length !== 2 || headers[0] !== 'Bearer') {
      return null;
    }
    const token = headers[1];
    const decodedToken = jwt.verify(token, 'secreto1');
    const userEmail = decodedToken.email;
    const user = await User.findOne({ email: userEmail })
    if (!user) return [null, "El usuario no existe"];

    const benefit = await Benefit.findById(benefitId);
    if (!benefit) return [null, "El beneficio no existe"];

    if (benefit.status !== 'active') return [null, "El beneficio no está activo"];

    console.log(user);
    console.log(benefit);

  const benefitFound = user.benefits.find((b) => b._id == benefitId);
  if (benefitFound) return [null, "El beneficio ya está vinculado al usuario"];


    const NdeBeneficios = user.benefits.length;
    if (NdeBeneficios == 5) return [null, "No se pueden asociar más de 5 beneficios al mes"];

    user.benefits.push(benefit);
    await user.save();

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> linkBenefitToUser");
  }
}

async function unlinkBenefitFromUser(req, benefitId) {
  try {
    const headers = req.headers.authorization.split(' ');
    if (headers.length !== 2 || headers[0] !== 'Bearer') {
      return null;
    }
    const token = headers[1];
    const decodedToken = jwt.verify(token, 'secreto1');
    const userEmail = decodedToken.email;
    const user = await User.findOne({ email: userEmail })
    if (!user) return [null, "El usuario no existe"];

    const benefitIndex = user.benefits.findIndex((b) => b._id == benefitId);

    if (benefitIndex !== -1) {
      user.benefits.splice(benefitIndex, 1);
      await user.save();
      return [user, null];
    } else {
      return [null, "El beneficio no existe para este usuario"];
    }
  } catch (error) {
    handleError(error, "user.service -> unlinkBenefitFromUser");
  }
}

cron.schedule('0 0 1 * *', async () => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const users = await User.find({ 'benefits.linkedAt': { $lt: oneMonthAgo } });

    for (let user of users) {
      user.benefits = user.benefits.filter(benefit => benefit.linkedAt > oneMonthAgo);
      await user.save();
    }
  } catch (error) {
    console.error(error);
  }
});

async function linkFormToUser(userId, formId) {

  try {
    const user = await User.findById(userId);
    if (!user) return [null, "El usuario no existe"];

    const form = await Form.findById(formId);
    if (!form) return [null, "El formulario no existe"];

    const formFound = user.form.find((b) => b._id == formId);
    if (formFound) return [null, "El formulario ya está vinculado al usuario"];

    user.form.push(form);
    await user.save();

    form.user = userId;
    await form.save();

    return [user, "Formulario asociado al usuario"];
  } catch (error) {
    handleError(error, "user.service -> linkFormToUser");
    return [null, "Error al asociar el formulario al usuario"];
  }
}

async function unlinkFormFromUser(userId, formId) {
  try {
    const user = await User.findById(userId);
    if (!user) return [null, "El usuario no existe"];

    const formIndex = user.form.findIndex(form => form.toString() === formId);

    if (formIndex !== -1) {
      user.form.splice(formIndex, 1);
      await user.save();
      return [user, "Formulario desvinculado del usuario"];
    } else {
      return [null, "El formulario no existe para este usuario"];
    }
  } catch (error) {
    handleError(error, "user.service -> unlinkFormFromUser");
    return [null, "Error al desvincular el formulario del usuario"];
  }
}






module.exports = {
  getUsers,
  createUser,
  getUserById,
  getUserByRut,
  updateUserById,
  updateUserByRut,
  updateApplicationStatusByRut,
  deleteUser,
  linkBenefitToUser,
  unlinkBenefitFromUser,
  linkFormToUser,
  unlinkFormFromUser,
  getUserByEmail,
};
