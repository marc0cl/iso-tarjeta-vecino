"use strict";

const express = require("express");

const benefitController = require("../controllers/benefit.controller.js");

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

router.use(authenticationMiddleware);

router.get("/", benefitController.getBenefits);
router.post("/", authorizationMiddleware.isAdmin, benefitController.createBenefit);
router.get("/:id", benefitController.getBenefitById);
router.put("/:id", authorizationMiddleware.isAdmin, benefitController.updateBenefit);
router.delete("/:id", authorizationMiddleware.isAdmin, benefitController.deleteBenefit);

module.exports = router;
