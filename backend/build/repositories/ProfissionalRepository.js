"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Profissional_1 = require("../models/Profissional");
class ProfissionalRepository {
    getAllProfissionais(Profissional) {
        return Profissional.find();
    }
    getOneProfissional(profissionalId, Profissional) {
        return Profissional.findOne({ _id: profissionalId });
    }
    createProfissional(dados) {
        return Profissional_1.Profissional.create({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            telefone: dados.telefone,
            sexo: dados.sexo,
        });
    }
    updateProfissional(profissionalId, dados, Profissional) {
        return Profissional.updateOne({ _id: profissionalId }, {
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            telefone: dados.telefone,
            sexo: dados.sexo,
        });
    }
    deleteProfissional(id) {
        return Profissional_1.Profissional.findByIdAndDelete(id);
    }
}
exports.default = new ProfissionalRepository();
