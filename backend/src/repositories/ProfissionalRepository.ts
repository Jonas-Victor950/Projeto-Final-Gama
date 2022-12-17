import { ObjectId } from "mongoose";
import Logger from "../database/logger";
import mongoose from "mongoose";
import { IProfissional, Profissional } from "../models/Profissional";

class ProfissionalRepository {
  getAllProfissionais(Profissional: any): Promise<Array<any>> {
    return Profissional.find();
  }

  getOneProfissional(profissionalId: mongoose.Types.ObjectId, Profissional: any): Promise<any> {
    return Profissional.findOne({ _id:  profissionalId });
  }

  createProfissional(dados: IProfissional): Promise<any> {
    return Profissional.create({
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      telefone: dados.telefone,
      sexo: dados.sexo,
    });
  }

  updateProfissional(
    profissionalId: mongoose.Types.ObjectId,
    dados: IProfissional,
    Profissional: any
  ): Promise<Array<any>> {
    return Profissional.updateOne(
      { _id: profissionalId },
      {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        telefone: dados.telefone,
        sexo: dados.sexo,
      }
    );
  }

  deleteProfissional(profissionalId: mongoose.Types.ObjectId, Profissional: any): Promise<any> {
    return Profissional.deleteOne({ profissionalId });
  }
}

export default new ProfissionalRepository();
