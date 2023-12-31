"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UserService = require("../services/user.service");
const { userBodySchema, userIdSchema, rutSchema } = require("../schema/user.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUsers(req, res) {
  try {
    const [usuarios, errorUsuarios] = await UserService.getUsers();
    if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createUser(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newUser, userError] = await UserService.createUser(body);

    if (userError) return respondError(req, res, 400, userError);
    if (!newUser) {
      return respondError(req, res, 400, "No se creo el usuario");
    }

    respondSuccess(req, res, 201, newUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "No se creo el usuario");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUserById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [user, errorUser] = await UserService.getUserById(params.id);

    if (errorUser) return respondError(req, res, 404, errorUser);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * Obtiene un usuario por su nombre de usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUserByRut(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = rutSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [user, errorUser] = await UserService.getUserByRut(params.username);

    if (errorUser) return respondError(req, res, 404, errorUser);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserByRut");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
/**

 Actualiza un usuario por su id
 @param {Object} req - Objeto de petición
 @param {Object} res - Objeto de respuesta
 */
async function updateUserById(req, res) {
  try {
    const { params, body } = req;

    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] = await UserService.updateUserById(params.id, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUserById");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateUserByRut(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = rutSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] = await UserService.updateUserByRut(params.rut, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUserByRut");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

/**
 * Actualiza un estado de aplicación de un usuario por su username
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateApplicationStatus(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = rutSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] =
        await UserService.updateApplicationStatusByRut(params.rut, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateApplicationStatus");
    respondError(req, res, 500, "No se pudo actualizar el estado de aplicación");
  }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteUser(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const user = await UserService.deleteUser(params.id);
    !user
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

/**
 * Asocia un beneficio a un usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function linkBenefitToUser(req, res) {
  try {
    const benefitId = req.params.benefitId;
    const [user, error] = await UserService.linkBenefitToUser(req, benefitId);

    if (error) {
      return res.status(400).json({ message:error });
    }

    return res.status(200).json({ user, message: 'Beneficio vinculado exitosamente al usuario.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

async function unlinkBenefitFromUser(req, res) {
  try {
    const benefitId = req.params.benefitId;
    const [user, error] = await UserService.unlinkBenefitFromUser(req, benefitId);

    if (error) {
      return res.status(400).json({ message:error });
    }

    return res.status(200).json({ user, message: 'Beneficio desvinculado exitosamente del usuario.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

async function linkFormToUser(req, res) {
  try {
    const { params } = req;
    const { id, idForm } = params;
    const [user, message] = await UserService.linkFormToUser(id, idForm);

    if (!user) {
      return respondError(req, res, 404, message);
    }

    respondSuccess(req, res, 200, "Formulario asociado al usuario");
  } catch (error) {
    handleError(error, "user.controller -> linkFormToUser");
    respondError(req, res, 500, "No se pudo asociar el formulario al usuario");
  }
}

async function unlinkFormFromUser(req, res) {
  try {
    const { params } = req;
    const { userId, formId } = params;
    const [user, message] = await UserService.unlinkFormFromUser(userId, formId);

    if (!user) {
      return respondError(req, res, 404, message);
    }

    return respondSuccess(req, res, 200, message);
  } catch (error) {
    handleError(error, "user.controller -> unlinkFormFromUser");
    respondError(req, res, 500, "No se pudo desvincular el formulario del usuario");
  }
}


async function getUserByEmail(req, res) {
  try {
    const { email } = req.params; // Suponiendo que el correo está en los parámetros de la URL
    const [user, error] = await UserService.getUserByEmail(email);

    if (error) {
      // Manejar el error (por ejemplo, enviar una respuesta de error)
      return res.status(404).json({ error: error });
    }

    // Enviar el usuario como respuesta
    return res.status(200).json({ user: user });
  } catch (error) {
    // Manejar otros errores inesperados
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}


module.exports = {
  getUsers,
  createUser,
  getUserById,
  getUserByRut,
  updateUserById,
  updateUserByRut,
  updateApplicationStatus,
  deleteUser,
  linkBenefitToUser,
  unlinkBenefitFromUser,
  linkFormToUser,
  unlinkFormFromUser,
  getUserByEmail,
};
