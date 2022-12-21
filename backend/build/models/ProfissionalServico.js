"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profissionalServico = void 0;
var mongoose_1 = require("mongoose");
var profissionalServicoSchema = new mongoose_1.Schema({
    profissional: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Profissional",
    },
    servico: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Servico" },
}, {
    timestamps: true,
    collection: "ProfissionalServico",
});
var profissionalServico = (0, mongoose_1.model)("ProfissionalServico", profissionalServicoSchema);
exports.profissionalServico = profissionalServico;
