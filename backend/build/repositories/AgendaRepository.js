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
            },
        });
    };
    AgendaRepository.prototype.deletarAgendar = function (id) {
        return Agenda_1.Agenda.findByIdAndDelete(id);
    };
    AgendaRepository.prototype.agendaProfissionais = function () {
        return Agenda_1.Agenda.aggregate([
            {
                $lookup: {
                    from: 'ProfissionalServico',
                    localField: 'profissionalServico',
                    foreignField: '_id',
                    as: 'Profissionais_Servico',
                },
            },
            {
                $unwind: '$Profissionais_Servico',
            },
            {
                $lookup: {
                    from: 'Servico',
                    localField: 'Profissionais_Servico.servico',
                    foreignField: '_id',
                    as: 'Servicos',
                },
            },
            {
                $unwind: '$Servicos',
            },
            {
                $lookup: {
                    from: 'Cliente',
                    localField: 'cliente',
                    foreignField: '_id',
                    as: 'Clientes',
                },
            },
            {
                $unwind: '$Clientes',
            },
            {
                $lookup: {
                    from: 'Profissional',
                    localField: 'Profissionais_Servico.profissional',
                    foreignField: '_id',
                    as: 'Profissionais',
                },
            },
        ]);
    };
    return AgendaRepository;
}());
exports.default = new AgendaRepository();
