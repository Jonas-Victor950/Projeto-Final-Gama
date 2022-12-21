"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProfissionalServico_1 = require("../models/ProfissionalServico");
var ProfissionalServicoRepository = /** @class */ (function () {
    function ProfissionalServicoRepository() {
    }
    ProfissionalServicoRepository.prototype.criarProfissionalServico = function (profissionalService) {
        return ProfissionalServico_1.profissionalServico.create({
            profissional: profissionalService.profissional,
            servico: profissionalService.servico
        });
    };
    ProfissionalServicoRepository.prototype.listarProfissionalServico = function () {
        return ProfissionalServico_1.profissionalServico.find();
    };
    ;
    ProfissionalServicoRepository.prototype.listarProfissionalServicoId = function (id) {
        return ProfissionalServico_1.profissionalServico.findById(id);
    };
    ;
    ProfissionalServicoRepository.prototype.atualizarProfissionalServico = function (profissionalServicoId, dados) {
        return ProfissionalServico_1.profissionalServico.updateOne({ _id: profissionalServicoId }, {
            profissional: dados.profissional,
            servico: dados.servico,
        });
    };
    ;
    ProfissionalServicoRepository.prototype.deletarProfissionalServico = function (id) {
        return ProfissionalServico_1.profissionalServico.findByIdAndDelete(id);
    };
    return ProfissionalServicoRepository;
}());
exports.default = new ProfissionalServicoRepository;
