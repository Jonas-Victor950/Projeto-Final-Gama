import mongoose, { Model } from 'mongoose';
import { servico, IServico } from '../models/Servico';

class ServicoRepository {
  criarServico(informacao: IServico) {
    return servico.create({
      servico: informacao.servico,
      preco: informacao.preco,
      duracao: informacao.duracao,
    });
  }

  listarServicos() {
    return servico.find();
  }

  listarServicoId(id: any) {
    return servico.findById(id);
  }

  atualizarServico(servicoId: mongoose.Types.ObjectId, dados: IServico) {
    return servico.updateOne(
      { _id: servicoId },
      {
        preco: dados.preco,
        servico: dados.servico,
        duracao: dados.duracao,
      }
    );
  }

  deletarServico(id: mongoose.Types.ObjectId) {
    return servico.deleteOne({ id });
  }
}

export default new ServicoRepository();
