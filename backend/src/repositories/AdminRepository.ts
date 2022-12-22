import mongoose from "mongoose";
import { Admin, IAdmin } from "../models/Admin";

class AdminRepository {
  criarAdmin(informacao: IAdmin) {
    return Admin.create({
      nome: informacao.nome,
      email: informacao.email,
      senha: informacao.senha,
    });
  }

  admin(Admin: any): Promise<Array<any>> {
    return Admin.find();
  }

  listarAdminId(adminId: mongoose.Types.ObjectId, Admin: any): Promise<any> {
    return Admin.findOne({ _id: adminId });
  }

  atualizarAdmin(id: mongoose.Types.ObjectId, dados: IAdmin) {
    return Admin.findByIdAndUpdate(id, {
      $set: {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
      },
    });
  }

  deletarAdmin(id: mongoose.Types.ObjectId) {
    return Admin.findByIdAndDelete(id);
  }
}

export default new AdminRepository();
