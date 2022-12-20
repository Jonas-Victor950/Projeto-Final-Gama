import mongoose from "mongoose";
import { ICliente, Cliente } from "../models/Cliente";

class ClienteRepository {
  criarCliente(informacao: ICliente) {
    return Cliente.create({
      nome: informacao.nome,
      email: informacao.email,
      senha: informacao.senha,
      telefone: informacao.telefone,
      aniversario: informacao.aniversario,
      sexo: informacao.email,
    });
  }

  listarClientes(Cliente: any): Promise<Array<any>> {
    return Cliente.find();
  }

  listarClienteId(
    clienteId: mongoose.Types.ObjectId,
    Cliente: any
  ): Promise<any> {
    return Cliente.findOne({ _id: clienteId });
  }

  atualizarCliente(id: mongoose.Types.ObjectId, dados: ICliente) {
    return Cliente.findByIdAndUpdate(id, {
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

  deletarCliente(id: mongoose.Types.ObjectId) {
    return Cliente.findByIdAndDelete(id);
  }
}

export default new ClienteRepository();
