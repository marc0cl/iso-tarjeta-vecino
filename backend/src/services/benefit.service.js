"use strict";

const Benefit = require("../models/benefit.model");
const { handleError } = require("../utils/errorHandler");
const { notificationNewBenefit } = require("./notification.service");
const cron = require("node-cron");


const soloLetras = /^[a-zA-Z\s]+$/;
const letrasYNumeros = /^[a-zA-Z0-9\s]+$/;
const NombreEmpresa = /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/^-]+$/;

async function getBenefits() {
  try {
    const benefits = await Benefit.find();
    if (!benefits) return [null, "No hay beneficios"];

    return [benefits, null];
  } catch (error) {
    handleError(error, "benefit.service -> getBenefits");
  }
};

async function createBenefit(benefit) {
  try {
    const { name, description, discount, company } = benefit;

    const benefitFound = await Benefit.findOne({ name: benefit.name });
    if (benefitFound) return [null, "El beneficio ya existe"];

    if (soloLetras.test(name) === false) return [null, "El nombre solo puede contener letras"];
    if (letrasYNumeros.test(description) === false) return [null, "La descripción solo puede contener letras y números"];
    if (discount < 0 || discount > 100) return [null, "El descuento debe ser entre 0 y 100"];
    if (NombreEmpresa.test(company) === false) return [null, "El nombre de la empresa no es válido"];


    const newBenefit = new Benefit({
      name,
      description,
      discount,
      company,
    });
    await newBenefit.save();
    await notificationNewBenefit(newBenefit);

    return [newBenefit, null];
  } catch (error) {
    handleError(error, "benefit.service -> createBenefit");
  }
};

cron.schedule('0 0 * * *', async () => {
  try {
    // Calcula la fecha hace 3 meses
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Encuentra y actualiza los beneficios creados hace más de 3 meses
    const result = await Benefit.updateMany(
      { createdAt: { $lt: threeMonthsAgo }, status: "active" },
      { $set: { status: "inactive" } }
    );

    console.log(`Se desactivaron ${result.nModified} beneficios después de 3 meses.`);
  } catch (error) {
    console.error(error);
  }
});

async function getBenefitById(id) {
  try {
    const benefit = await Benefit.findById(id);
    if (!benefit) return [null, "El beneficio no existe"];

    return [benefit, null];
  } catch (error) {
    handleError(error, "benefit.service -> getBenefitById");
  }
};

async function updateBenefit(id, benefit) {
  try {
    const benefitFound = await Benefit.findById(id);
    if (!benefitFound) return [null, "El beneficio no existe"];

    const { name, description, discount, company } = benefit;

    const benefitUpdated = await Benefit.findByIdAndUpdate(
      id,
      {
        name,
        description,
        discount,
        company,
      },
      { new: true }
    );
    return [benefitUpdated, null];
  } catch (error) {
    handleError(error, "benefit.service -> updateBenefit");
  }
};

async function deleteBenefit(id) {
  try {
    const benefitFound = await Benefit.findById(id);
    if (!benefitFound) return [null, "El beneficio no existe"];

    await Benefit.findByIdAndDelete(id);
    return ["Beneficio eliminado", null];
  } catch (error) {
    handleError(error, "benefit.service -> deleteBenefit");
  }
};

module.exports = {
  getBenefits,
  createBenefit,
  getBenefitById,
  updateBenefit,
  deleteBenefit,
};