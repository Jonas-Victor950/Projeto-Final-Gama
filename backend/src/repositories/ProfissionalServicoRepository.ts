import mongoose, { Model } from "mongoose";
import { Profissional } from "../models/Profissional";
import {
  profissionalServico,
  IProfissionalServico,
} from "../models/ProfissionalServico";

class ProfissionalServicoRepository {
  criarProfissionalServico(profissionalService: IProfissionalServico) {
    return profissionalServico.create({
      profissional: profissionalService.profissional,
      servico: profissionalService.servico,
    });
  }

  listarProfissionalServico() {
    return profissionalServico.find();
  }

  listarProfissionalServicoId(id: any) {
    return profissionalServico.findById(id);
  }

  atualizarProfissionalServico(
    profissionalServicoId: mongoose.Types.ObjectId,
    dados: IProfissionalServico
  ) {
    return profissionalServico.updateOne(
      { _id: profissionalServicoId },
      {
        profissional: dados.profissional,
        servico: dados.servico,
      }
    );
  }

  deletarProfissionalServico(id: mongoose.Types.ObjectId) {
    return profissionalServico.findByIdAndDelete(id);
  }
}

export default new ProfissionalServicoRepository();
