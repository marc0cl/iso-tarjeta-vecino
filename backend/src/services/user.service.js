"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const Benefit = require("../models/benefit.model.js");
const Form = require("../models/form.model.js");
const { handleError } = require("../utils/errorHandler");
const cron = require("node-cron");
const { request } = require("express");

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
      username,
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
      username,
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
 * @param {string} username nombre del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ username: username })
        .select("-password")
        .populate("roles")
        .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByUsername");
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

    const { username, email, password, newPassword, roles } = user;

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
        username,
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
 * @param {string} username Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUserByUsername(username, user) {
  try {
    const userFound = await User.findOne({ username: username });
    if (!userFound) return [null, "El usuario no existe"];

    const { username: newUsername, email, password, newPassword, roles } = user;

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
        { username: username },
        {
          username: newUsername || username,
          email,
          password: await User.encryptPassword(newPassword || password),
          roles: myRole,
        },
        { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateUserByUsername");
  }
}

/**
 * Actualiza un estado de usuario por su username en la base de datos
 * @param {string} username Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateApplicationStatusByUsername(username, user) {
  try {
    const userFound = await User.findOne({ username: username });
    if (!userFound) return [null, "El usuario no existe"];

    const { password, applicationStatus } = user;

    const matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const userUpdated = await User.findOneAndUpdate(
        { username: username },
        { applicationStatus },
        { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateApplicationStatusByUsername");
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

async function linkBenefitToUser(userId, benefitId) {
  try {
    const user = await User.findById(userId);
    if (!user) return [null, "El usuario no existe"];

    const benefit = await Benefit.findById(benefitId);
    if (!benefit) return [null, "El beneficio no existe"];

    const benefitFound = user.benefits.find((b) => b._id == benefitId);
    if (benefitFound) return [null, "El beneficio ya está vinculado al usuario"];

    const NdeBeneficios = user.benefits.length;
    if (NdeBeneficios == 5) return [null, "No se pueden asociar más de 5 beneficios al mes"];

    user.benefits.push(benefit);
    await user.save();

    return [user, "Beneficio asociado al usuario, recuerde que el beneficio vence en 1 mes"];
  } catch (error) {
    handleError(error, "user.service -> linkBenefitToUser");
  }
}

cron.schedule("0 0 * * *", async () => {
  try {
    // Calcula la fecha hace un mes
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Encuentra y elimina los beneficios creados hace más de un mes
    const result = await Benefit.deleteMany({ createdAt: { $lt: oneMonthAgo } });

    console.log(`Se eliminaron ${result.deletedCount} beneficios vencidos.`);
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
  getUserByUsername,
  updateUserById,
  updateUserByUsername,
  updateApplicationStatusByUsername,
  deleteUser,
  linkBenefitToUser,
  linkFormToUser,
  unlinkFormFromUser,
};
