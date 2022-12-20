
import { Request, Response } from "express"
import { Types } from "mongoose";
import Logger from "../database/logger";
import { IProfissionalServico, profissionalServico } from "../models/ProfissionalServico";
import ProfissionalServicoRepository from "../repositories/ProfissionalServicoRepository";
import mongoose, { Model } from "mongoose";
import MESSAGE from "../constants/messages";




const ProfissionalServicoController = {

  async criarProfissionalServico(req: Request, res: Response) {
    const { profissional, servico } = req.body;

    const novoProfissionalServico: IProfissionalServico = {
      profissional,
      servico,
    }
    try {
      await ProfissionalServicoRepository.criarProfissionalServico(novoProfissionalServico)
      return res.status(201).json(novoProfissionalServico)
    } catch (error) {
      Logger.error(error)
    }
    return res.status(201).json(novoProfissionalServico)

  },

  async listarProfissionalServico(req: Request, res: Response) {
    try {

      const profissionalServicos = await ProfissionalServicoRepository.listarProfissionalServico().populate('profissional').populate('servico')
      if (!profissionalServicos) {
        Logger.error(MESSAGE.ERROR.PROFISSIONALSERVICOS.NONE_PROFISSIONALSERVICO_UNTIL_NOW)
      }

      return res.status(200).json(profissionalServicos)
    }
    catch (error) {
      Logger.error(error)

    }
  },

  async listarProfissionalServicoId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const profissionalServicoId = await ProfissionalServicoRepository.listarProfissionalServicoId(id).populate('profissional').populate('servico')
      if (!profissionalServicoId) {
        return res.json(MESSAGE.ERROR.NOT_VALID_ID)
      } else {
        return res.status(200).json(profissionalServicoId)
      }
    }
    catch (error) {
      Logger.error(error)
    }
  },


  async atualizarProfissionalServico(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const newProfissionalServico: {
        profissional: Types.ObjectId,
        servico: Types.ObjectId
      } = req.body;

      const profissionalServicos = await ProfissionalServicoRepository.atualizarProfissionalServico(
        id,
        newProfissionalServico

      )

      const newProfissionalServico2 = await profissionalServico.findById(id)
      if (!newProfissionalServico2) {
        res.status(404).json(MESSAGE.ERROR.PROFISSIONALSERVICOS.PROFISSIONALSERVICO_NOT_FOUND)
      } else {
        res.status(200).json(MESSAGE.SUCCESS.PROFISSIONALSERVICO.PROFISSIONALSERVICO_SENDING)
      }

    }
    catch (error) {
      Logger.error(error)
    }
  },
  async deletaProfissionalServico(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const profissionalServico = await ProfissionalServicoRepository.deletarProfissionalServico(id)
      return res.json(MESSAGE.SUCCESS.PROFISSIONALSERVICO.PROFISSIONALSERVICO_DELETED).sendStatus(404)
    }
    catch (error) {
      Logger.error(error)
    }
  }



}

export default ProfissionalServicoController;