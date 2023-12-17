"use strict";

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: false
    }, // Espacio para la respuesta del usuario
});

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [questionSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }   
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;

