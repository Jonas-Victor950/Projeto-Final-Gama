"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProfissionalServico_1 = require("../models/ProfissionalServico");
class ProfissionalServicoRepository {
    criarProfissionalServico(profissionalService) {
        return ProfissionalServico_1.profissionalServico.create({
            profissional: profissionalService.profissional,
            servico: profissionalService.servico
        });
    }
    listarProfissionalServico() {
        return ProfissionalServico_1.profissionalServico.find();
    }
    ;
    listarProfissionalServicoId(id) {
        return ProfissionalServico_1.profissionalServico.findById(id);
    }
    ;
    atualizarProfissionalServico(profissionalServicoId, dados) {
        return ProfissionalServico_1.profissionalServico.updateOne({ _id: profissionalServicoId }, {
            profissional: dados.profissional,
            servico: dados.servico,
        });
    }
    ;
    deletarProfissionalServico(id) {
        return ProfissionalServico_1.profissionalServico.findByIdAndDelete(id);
    }
}
exports.default = new ProfissionalServicoRepository;
