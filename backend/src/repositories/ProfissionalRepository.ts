import { ObjectId } from "mongoose";
import { IProfissional, Profissional } from "../models/Profissional";

class ProfissionalRepository {
  getAllProfissionais(): Promise<Array<any>> {
    return Profissional.find();
  }

  getOneProfissional(profissionalId: string): Promise<any> {
    return Profissional.findOne({ _id: profissionalId });
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
    profissionalId: string,
    dados: IProfissional
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

  deleteProfissional(profissionalId: string): Promise<any> {
    return Profissional.deleteOne({ profissionalId });
  }
}

export default new ProfissionalRepository();
