"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Admin_1 = require("../models/Admin");
var AdminRepository = /** @class */ (function () {
    function AdminRepository() {
    }
    AdminRepository.prototype.criarAdmin = function (informacao) {
        return Admin_1.Admin.create({
            nome: informacao.nome,
            email: informacao.email,
            senha: informacao.senha,
        });
    };
    AdminRepository.prototype.admin = function (Admin) {
        return Admin.find();
    };
    AdminRepository.prototype.listarAdminId = function (adminId, Admin) {
        return Admin.findOne({ _id: adminId });
    };
    AdminRepository.prototype.atualizarAdmin = function (id, dados) {
        return Admin_1.Admin.findByIdAndUpdate(id, {
            $set: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
            },
        });
    };
    AdminRepository.prototype.deletarAdmin = function (id) {
        return Admin_1.Admin.findByIdAndDelete(id);
    };
    return AdminRepository;
}());
exports.default = new AdminRepository();
