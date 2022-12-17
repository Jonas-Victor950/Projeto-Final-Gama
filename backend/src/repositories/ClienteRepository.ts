import mongoose, { Model } from 'mongoose';
import { ICliente, Cliente } from '../models/Cliente';

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

  atualizarCliente(
    clienteId: mongoose.Types.ObjectId,
    dados: ICliente,
    Cliente: any
  ): Promise<Array<any>> {
    return Cliente.updateOne(
      { _id: clienteId },
      {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        telefone: dados.telefone,
        aniversario: dados.aniversario,
        sexo: dados.sexo,
      }
    );
  }

  deletarCliente(
    ClienteId: mongoose.Types.ObjectId,
    Cliente: any
  ): Promise<any> {
    return Cliente.deleteOne({ ClienteId });
  }
}

export default new ClienteRepository();
