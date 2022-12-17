"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profissionalServicoSchema = new mongoose_1.Schema({
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
const ProfissionalServico = (0, mongoose_1.model)("ProfissionalServico", profissionalServicoSchema);
exports.default = ProfissionalServico;
