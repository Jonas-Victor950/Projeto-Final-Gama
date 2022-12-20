"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("../models/Cliente");
class ClienteRepository {
    criarCliente(informacao) {
        return Cliente_1.Cliente.create({
            nome: informacao.nome,
            email: informacao.email,
            senha: informacao.senha,
            telefone: informacao.telefone,
            aniversario: informacao.aniversario,
            sexo: informacao.email,
        });
    }
    listarClientes(Cliente) {
        return Cliente.find();
    }
    listarClienteId(clienteId, Cliente) {
        return Cliente.findOne({ _id: clienteId });
    }
    atualizarCliente(id, dados) {
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
    }
    deletarCliente(id) {
        return Cliente_1.Cliente.findByIdAndDelete(id);
    }
}
exports.default = new ClienteRepository();
