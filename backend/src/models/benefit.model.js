"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,

        discount: {
            type: Number,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

const Benefit = mongoose.model("Benefit", benefitSchema);

module.exports = Benefit;