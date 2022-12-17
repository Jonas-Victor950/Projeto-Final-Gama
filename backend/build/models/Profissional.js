"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profissional = void 0;
const mongoose_1 = require("mongoose");
const profissionalSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    sexo: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Profissional",
});
const Profissional = (0, mongoose_1.model)("Profissional", profissionalSchema);
exports.Profissional = Profissional;
