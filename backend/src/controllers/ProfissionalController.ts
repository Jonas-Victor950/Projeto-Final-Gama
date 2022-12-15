import mongoose from "mongoose";
import { Types, Mongoose } from "mongoose";
import { Request, Response } from "express";
import Logger from "../database/logger";
import { IProfissional, Profissional } from "../models/Profissional";
import ProfissionalRepository from "../repositories/ProfissionalRepository";
import bcrypty from "bcryptjs";

class ProfissionalController {
  static async allProfissionais(req: Request, res: Response) {
    try {
      const profissionais: Array<IProfissional> =
        await ProfissionalRepository.getAllProfissionais(Profissional);

      if (profissionais.length <= 0) {
        Logger.info("Nenhum profissional até o momento");
        return res.status(200).json({
          success: false,
          msg: "Nenhum profissional até o momento",
        });
      } else {
        Logger.info("Profissionais encontrados");
        return res.status(200).json({
          success: true,
          msg: "Profissionais encontrados",
          data: profissionais,
        });
      }
    } catch (error: any) {
      Logger.error(`Pane no sistema: ${error.message}`);
      return res.status(500).json({ success: false, msg: "✖️ Ops, deu ruim!" });
    }
  }

  static async getOneProfissional(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error("Insira um id válido");
        return res
          .status(500)
          .json({ success: false, msg: "Insira um id válido" });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const profissional = await ProfissionalRepository.getOneProfissional(
        id,
        Profissional
      );

      if (!profissional) {
        Logger.error("Profissional não encontrado");
        return res.status(500).json({
          success: false,
          msg: "Profissional não encontrado",
        });
      } else {
        Logger.info("Mandando o profissional que foi pedido!");
        return res.json({ success: true, data: profissional });
      }
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({ success: false, msg: "✖️ Ops, deu ruim!" });
    }
  }

  static async createProfissional(req: Request, res: Response) {
    const { nome, email, senha, telefone, sexo } = req.body;
    const newSenha = bcrypty.hashSync(senha, 10);
    const profissionalObj: IProfissional = {
      nome: nome,
      email: email,
      senha: newSenha,
      telefone: telefone,
      sexo: sexo,
    };

    try {
      const profissional = await ProfissionalRepository.createProfissional(
        profissionalObj
      );

      Logger.info("Profissional Criado");
      return res.status(200).json({
        success: true,
        msg: "Profissional Criado",
        data: profissional,
      });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({ success: false, msg: "✖️ Ops, deu ruim!" });
    }
  }

  static async updateOneProfissional(req: Request, res: Response) {
    const { nome, email, senha, telefone, sexo } = req.body;
    const newSenha = bcrypty.hashSync(senha, 10);
    const profissionalObj: IProfissional = {
      nome: nome,
      email: email,
      senha: newSenha,
      telefone: telefone,
      sexo: sexo,
    };

    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error("Insira um id válido");
        return res
          .status(500)
          .json({ success: false, msg: "Insira um id válido" });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const profissional = await ProfissionalRepository.getOneProfissional(
        id,
        Profissional
      );

      if (!profissional) {
        Logger.error("Profissional não encontrado");
        return res.status(500).json({
          success: false,
          msg: "Profissional não encontrado",
        });
      } else {
        const updatedProfissional =
          await ProfissionalRepository.updateProfissional(
            id,
            profissionalObj,
            Profissional
          );

        Logger.info("Profissional atualizado");
        return res.status(200).json({
          success: true,
          msg: "Profissional atualizado",
          data: profissionalObj,
        });
      }
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({ success: false, msg: "✖️ Ops, deu ruim!" });
    }
  }

  static async deleteOneProfissional(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error("Insira um id válido");
        return res
          .status(500)
          .json({ success: false, msg: "Insira um id válido" });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const profissional = await ProfissionalRepository.getOneProfissional(
        id,
        Profissional
      );

      if (!profissional) {
        Logger.error("Profissional não encontrado");
        return res.status(500).json({
          success: false,
          msg: "Profissional não encontrado",
        });
      } else {
        await ProfissionalRepository.deleteProfissional(id, Profissional);

        Logger.info("Profissional deletado");
        return res.status(200).json({
          success: true,
          msg: "Profissional deletado",
        });
      }
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({ success: false, msg: "✖️ Ops, deu ruim!" });
    }
  }
}

export default ProfissionalController;
