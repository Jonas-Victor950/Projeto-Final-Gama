"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente_1 = require("../models/Cliente");
var ClienteRepository = /** @class */ (function () {
    function ClienteRepository() {
    }
    ClienteRepository.prototype.criarCliente = function (informacao) {
        return Cliente_1.Cliente.create({
            nome: informacao.nome,
            email: informacao.email,
            senha: informacao.senha,
            telefone: informacao.telefone,
            aniversario: informacao.aniversario,
            sexo: informacao.sexo,
        });
    };
    ClienteRepository.prototype.listarClientes = function (Cliente) {
        return Cliente.find();
    };
    ClienteRepository.prototype.localizarClientesNome = function (cliente) {
        return Cliente_1.Cliente.find({
            nome: { $regex: "".concat(cliente), $options: 'i' },
        });
    };
    ClienteRepository.prototype.listarClienteId = function (clienteId) {
        return Cliente_1.Cliente.findOne({ _id: clienteId });
    };
    ClienteRepository.prototype.atualizarCliente = function (id, dados) {
        return Cliente_1.Cliente.findByIdAndUpdate(id, {
            $set: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                telefone: dados.telefone,
                aniversario: dados.aniversario,
                sexo: dados.sexo,
            },
        });
    };
    ClienteRepository.prototype.deletarCliente = function (id) {
        return Cliente_1.Cliente.findByIdAndDelete(id);
    };
    return ClienteRepository;
}());
exports.default = new ClienteRepository();
