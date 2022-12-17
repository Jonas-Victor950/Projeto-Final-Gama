"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Servico_1 = require("../models/Servico");
class ServicoRepository {
    criarServico(informacao) {
        return Servico_1.servico.create({
            servico: informacao.servico,
            preco: informacao.preco,
            duracao: informacao.duracao
        });
    }
    listarServicos() {
        return Servico_1.servico.find();
    }
    listarServicoId(id) {
        return Servico_1.servico.findById(id);
    }
    atualizarServico(servicoId, dados) {
        return Servico_1.servico.updateOne({ _id: servicoId }, {
            preco: dados.preco,
            servico: dados.servico,
            duracao: dados.duracao,
        });
    }
    deletarServico(id) {
        return Servico_1.servico.deleteOne();
    }
}
exports.default = new ServicoRepository;
