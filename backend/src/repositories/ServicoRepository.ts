import mongoose from 'mongoose';
import { Servico, IServico } from '../models/Servico';

class ServicoRepository {
  criarServico(informacao: IServico) {
    return Servico.create(informacao);
  }

  listarServicos() {
    return Servico.find();
  }

  listarServicoId(id: mongoose.Types.ObjectId) {
    return Servico.findOne(id);
  }

  atualizarServico(id: mongoose.Types.ObjectId, dados: IServico) {
    return Servico.findByIdAndUpdate(
    
       id,
      
      {
        $set: {
          servico: dados.servico,
          preco: dados.preco,
          duracao: dados.duracao
        }
      }
    );
     
  
  }
  deletarServico(id: mongoose.Types.ObjectId) {
    return Servico.findByIdAndDelete(id);
  }
}

export default new ServicoRepository();
