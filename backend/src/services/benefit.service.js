"use strict";

const Benefit = require("../models/benefit.model");
const { handleError } = require("../utils/errorHandler");

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

    const newBenefit = new Benefit({
      name,
      description,
      discount,
      company,
    });
    await newBenefit.save();

    return [newBenefit, null];
  } catch (error) {
    handleError(error, "benefit.service -> createBenefit");
  }
};

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