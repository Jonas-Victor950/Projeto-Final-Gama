import mongoose from "mongoose";
import MESSAGE from "../constants/messages";
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
        Logger.info(MESSAGE.ERROR.PROFISSIONAIS.NONE_PROFSSIONAL_UNTIL_NOW);
        return res.status(200).json({
          success: false,
          msg: MESSAGE.ERROR.PROFISSIONAIS.NONE_PROFSSIONAL_UNTIL_NOW,
        });
      } else {
        Logger.info(MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONALS_FOUND);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONALS_FOUND,
          data: profissionais,
        });
      }
    } catch (error: any) {
      Logger.error(`${error.message}`);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  }

  static async getOneProfissional(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(404)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const profissional = await ProfissionalRepository.getOneProfissional(
        id,
        Profissional
      );

      if (!profissional) {
        Logger.error(MESSAGE.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND,
        });
      } else {
        Logger.info(MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_SENDING);
        return res.json({ success: true, data: profissional });
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
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

      Logger.info(MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_CREATED);
      return res.status(201).json({
        success: true,
        msg: MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_CREATED,
        data: profissional,
      });
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  }

  static async updateOneProfissional(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const profissional = await ProfissionalRepository.getOneProfissional(
        id,
        Profissional
      );

      if (!profissional) {
        Logger.error(MESSAGE.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND,
        });
      } else {
        const { nome, email, senha, telefone, sexo } = req.body;
        if (!senha) {
          const profissionalobb = {
            nome: nome,
            email: email,
            telefone: telefone,
            sexo: sexo,
          };
          const updated1Profissional =
            await ProfissionalRepository.updateProfissional(
              id,
              profissionalobb
            );

          Logger.info(MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED);
          return res.status(200).json({
            success: true,
            msg: MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED,
            data: profissionalobb,
          });
        } else {
          const newSenha = bcrypty.hashSync(senha, 10);
          const profissionalObj: IProfissional = {
            nome: nome,
            email: email,
            senha: newSenha,
            telefone: telefone,
            sexo: sexo,
          };
          const updatedProfissional =
            await ProfissionalRepository.updateProfissional(
              id,
              profissionalObj
            );

          Logger.info(MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED);
          return res.status(200).json({
            success: true,
            msg: MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED,
            data: profissionalObj,
          });
        }
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  }

  static async deleteOneProfissional(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const profissional = await ProfissionalRepository.getOneProfissional(
        id,
        Profissional
      );

      if (!profissional) {
        Logger.error(MESSAGE.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND,
        });
      } else {
        await ProfissionalRepository.deleteProfissional(id);

        Logger.info(MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_DELETED);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.PROFISSIONAIS.PROFISSIONAL_DELETED,
        });
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  }
}

export default ProfissionalController;
