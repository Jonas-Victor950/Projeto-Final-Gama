"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servico = void 0;
const mongoose_1 = require("mongoose");
const servicoSchema = new mongoose_1.Schema({
    servico: { type: String, required: true },
    preco: { type: String, required: true },
    duracao: { type: String, required: true },
}, {
    timestamps: true,
    collection: "Servico",
});
const servico = (0, mongoose_1.model)("Servico", servicoSchema);
exports.servico = servico;
