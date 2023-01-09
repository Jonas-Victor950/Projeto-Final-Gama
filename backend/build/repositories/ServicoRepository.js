"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Servico_1 = require("../models/Servico");
var ServicoRepository = /** @class */ (function () {
    function ServicoRepository() {
    }
    ServicoRepository.prototype.criarServico = function (informacao) {
        return Servico_1.Servico.create(informacao);
    };
    ServicoRepository.prototype.listarServicos = function () {
        return Servico_1.Servico.find();
    };
    ServicoRepository.prototype.listarServicoId = function (id) {
        return Servico_1.Servico.findOne(id);
    };
    ServicoRepository.prototype.atualizarServico = function (id, dados) {
        return Servico_1.Servico.findByIdAndUpdate(id, {
            $set: {
                servico: dados.servico,
                preco: dados.preco,
                duracao: dados.duracao,
            },
        });
    };
    ServicoRepository.prototype.deletarServico = function (id) {
        return Servico_1.Servico.findByIdAndDelete(id);
    };
    return ServicoRepository;
}());
exports.default = new ServicoRepository();
