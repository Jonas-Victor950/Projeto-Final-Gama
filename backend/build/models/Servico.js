"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servico = void 0;
var mongoose_1 = require("mongoose");
var servicoSchema = new mongoose_1.Schema({
    servico: { type: String, required: true },
    preco: { type: String, required: true },
    duracao: { type: String, required: true },
    descricao: { type: String, default: 'Serviço de primeira qualidade!' },
}, {
    timestamps: true,
    collection: "Servico",
});
var Servico = (0, mongoose_1.model)("Servico", servicoSchema);
exports.Servico = Servico;
