"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var agendaSchema = new mongoose_1.Schema({
    profissionalServico: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "ProfissionalServico",
    },
    cliente: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "Cliente" },
    data: { type: Date, required: true },
}, {
    timestamps: true,
    collection: "Agenda",
});
var Agenda = (0, mongoose_1.model)("Agenda", agendaSchema);
exports.default = Agenda;
