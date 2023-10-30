"use strict";

const mongoose = require("mongoose");

const formAnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
    },
    form: {
        type: mongoose.Schema.Types.ObjectId, ref: "Form",
    },
    answer: [{
        type: String,
        required: false
    }],
});


const FormAnswer = mongoose.model("FormAnswer", formAnswerSchema);

module.exports = FormAnswer;