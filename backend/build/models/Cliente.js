"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clienteSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    aniversario: { type: String, required: true },
    sexo: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Cliente",
});
const Cliente = (0, mongoose_1.model)("Cliente", clienteSchema);
exports.default = Cliente;
