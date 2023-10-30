"use strict";

const Benefit = require("../models/benefit.model");
const BenefitService = require("../services/benefit.service");
const { benefitBodySchema, benefitIdSchema } = require("../schema/benefit.schema");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function getBenefits(req, res) {
  try {
    const [benefits, errorBenefits] = await BenefitService.getBenefits();
    if (errorBenefits) return respondError(req, res, 404, errorBenefits);

    benefits.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, benefits);
  } catch (error) {
    handleError(error, "benefit.controller -> getBenefits");
    respondError(req, res, 400, error.message);
  }
};

async function createBenefit(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = benefitBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newBenefit, benefitError] = await BenefitService.createBenefit(body);

    if (benefitError) return respondError(req, res, 400, benefitError);
    if (!newBenefit) {
      return respondError(req, res, 400, "No se creo el beneficio");
    }

    respondSuccess(req, res, 201, newBenefit);
  } catch (error) {
    handleError(error, "benefit.controller -> createBenefit");
    respondError(req, res, 500, "No se creo el beneficio");
  }
};

async function getBenefitById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = benefitIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [benefit, errorBenefit] = await BenefitService.getBenefitById(params.id);
    if (errorBenefit) return respondError(req, res, 404, errorBenefit);

    respondSuccess(req, res, 200, benefit);
  } catch (error) {
    handleError(error, "benefit.controller -> getBenefitById");
    respondError(req, res, 400, error.message);
  }
};

async function updateBenefit(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = benefitIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = benefitBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [benefit, errorBenefit] = await BenefitService.updateBenefit(params.id, body);
    if (errorBenefit) return respondError(req, res, 404, errorBenefit);

    respondSuccess(req, res, 200, benefit);
  } catch (error) {
    handleError(error, "benefit.controller -> updateBenefit");
    respondError(req, res, 400, error.message);
  }
};

async function deleteBenefit(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = benefitIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [benefit, errorBenefit] = await BenefitService.deleteBenefit(params.id);
    if (errorBenefit) return respondError(req, res, 404, errorBenefit);

    respondSuccess(req, res, 200, benefit);
  } catch (error) {
    handleError(error, "benefit.controller -> deleteBenefit");
    respondError(req, res, 400, error.message);
  }
};

module.exports = {
  getBenefits,
  createBenefit,
  getBenefitById,
  updateBenefit,
  deleteBenefit,
};