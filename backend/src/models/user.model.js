"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Crea el esquema de la coleccion 'User'
const userSchema = new mongoose.Schema({
    username: {
        type: String, required: true,
    }, password: {
        type: String, required: true,
    }, firstName: {
        type: String, required: true, default: "",
    }, lastName: {
        type: String, required: true, default: "",
    }, gender: {
        type: String, required: true, default: "",
    }, email: {
        type: String, required: true, default: "", unique: true,
    }, location: {
        type: String, required: true, default: "",
    }, residenceCertificate: {
        type: String,
    }, roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
        },
    ]
    , documentImage: {
     type: String,
    },
     applicationStatus: {
        type: String, enum: ["aprobado", "rechazado", "apelacion"],
    }, benefits: [{
        benefit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Benefit'
        },
        linkedAt: {
          type: Date,
          default: Date.now
        }
      }], form: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
}, {
    versionKey: false,
    timestamps: true,
});

/** Encripta la contraseña del usuario (si aún es necesario) */
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

/** Compara la contraseña del usuario (si aún es necesario) */
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

userSchema.path("benefits").validate(function(value) {
    return value.length <= 5;
}, "You cannot have more than 5 associated benefits in a month");

/** Modelo de datos 'User' */
const User = mongoose.model("User", userSchema);

// Exporta el modelo de datos

module.exports = User;
