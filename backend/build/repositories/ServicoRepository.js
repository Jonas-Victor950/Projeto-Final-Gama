"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Servico_1 = require("../models/Servico");
class ServicoRepository {
    criarServico(informacao) {
        return Servico_1.Servico.create(informacao);
    }
    listarServicos() {
        return Servico_1.Servico.find();
    }
    listarServicoId(id) {
        return Servico_1.Servico.findById(id);
    }
    atualizarServico(id, dados) {
        return Servico_1.Servico.findByIdAndUpdate(id, {
            $set: {
                servico: dados.servico,
                preco: dados.preco,
                duracao: dados.duracao
            }
        });
    }
    deletarServico(id) {
        return Servico_1.Servico.findByIdAndDelete(id);
    }
}
exports.default = new ServicoRepository();
