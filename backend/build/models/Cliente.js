"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var mongoose_1 = require("mongoose");
var clienteSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    telefone: { type: String, required: true },
    aniversario: { type: String },
    sexo: { type: String },
}, {
    timestamps: true,
    collection: "Cliente",
});
var Cliente = (0, mongoose_1.model)("Cliente", clienteSchema);
exports.Cliente = Cliente;
