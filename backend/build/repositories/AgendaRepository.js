"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Agenda_1 = require("../models/Agenda");
var AgendaRepository = /** @class */ (function () {
    function AgendaRepository() {
    }
    AgendaRepository.prototype.criarAgenda = function (dados) {
        return Agenda_1.Agenda.create(dados);
    };
    AgendaRepository.prototype.listarAgenda = function () {
        return Agenda_1.Agenda.find();
    };
    AgendaRepository.prototype.listarAgendaId = function (id) {
        return Agenda_1.Agenda.findById(id);
    };
    AgendaRepository.prototype.atualizarAgenda = function (id, dados) {
        return Agenda_1.Agenda.findByIdAndUpdate(id, {
            $set: {
                profissionalServico: dados.profissionalServico,
                cliente: dados.cliente,
                data: dados.data,
            }
        });
    };
    AgendaRepository.prototype.deletarAgendar = function (id) {
        return Agenda_1.Agenda.findByIdAndDelete(id);
    };
    return AgendaRepository;
}());
exports.default = new AgendaRepository();
