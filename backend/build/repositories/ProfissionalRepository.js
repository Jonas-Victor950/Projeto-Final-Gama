"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Profissional_1 = require("../models/Profissional");
var ProfissionalRepository = /** @class */ (function () {
    function ProfissionalRepository() {
    }
    ProfissionalRepository.prototype.getAllProfissionais = function (Profissional) {
        return Profissional.find();
    };
    ProfissionalRepository.prototype.getOneProfissional = function (profissionalId, Profissional) {
        return Profissional.findOne({ _id: profissionalId });
    };
    ProfissionalRepository.prototype.createProfissional = function (dados) {
        return Profissional_1.Profissional.create({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            telefone: dados.telefone,
            sexo: dados.sexo,
        });
    };
    ProfissionalRepository.prototype.updateProfissional = function (id, dados) {
        return Profissional_1.Profissional.findByIdAndUpdate(id, {
            $set: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                telefone: dados.telefone,
                sexo: dados.sexo,
            },
        });
    };
    ProfissionalRepository.prototype.deleteProfissional = function (id) {
        return Profissional_1.Profissional.findByIdAndDelete(id);
    };
    return ProfissionalRepository;
}());
exports.default = new ProfissionalRepository();
