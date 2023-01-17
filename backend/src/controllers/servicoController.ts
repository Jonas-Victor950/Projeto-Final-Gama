import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import MESSAGE from "../constants/messages";
import Logger from "../database/logger";
import { Servico, IServico } from "../models/Servico";
import ServicoRepository from "../repositories/ServicoRepository";

const servicoController = {
  async criarServico(req: Request, res: Response) {
    const { servico, preco, duracao, descricao } = req.body;
    const novoServico: IServico = {
      servico,
      preco,
      duracao,
      descricao,
    };
    try {
      const servicos = await ServicoRepository.criarServico(novoServico);
      return res.status(201).json(servicos);
    
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ error, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async listarServico(req: Request, res: Response) {
    try {
      const servicos = await ServicoRepository.listarServicos();
      if (!servicos) {
        res.status(404).json(MESSAGE.ERROR.SERVICOS.NONE_SERVICO_UNTIL_NOW);
      }

      return res.status(200).json(servicos);
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ error, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async listarServicoId(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const servicoId = await ServicoRepository.listarServicoId(id);
      
      if (!servicoId) {
        return res.status(404).json(MESSAGE.ERROR.NOT_VALID_ID);
      } else {
        return res.status(200).json(servicoId);
      }
    
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ error, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async atulizarServico(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const { servico, preco, duracao, descricao } = req.body;

      const servicoAtualizado: IServico = {
        servico,
        preco,
        duracao,
        descricao,
      };

      await ServicoRepository.atualizarServico(
        id,
        servicoAtualizado
      );

      const newServico2 = await Servico.findById(id);
      if (!newServico2) {
        res.status(404).json(MESSAGE.ERROR.SERVICOS.SERVICO_NOT_FOUND);
      
      } else {
        res.status(200).json(MESSAGE.SUCCESS.SERVICO.SERVICO_SENDING);
      }
    
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ error, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async deletaServico(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const service = await Servico.findById(id)

      if(!service) {
        return res.status(404).json(MESSAGE.ERROR.SERVICOS.SERVICO_NOT_FOUND)
      
      } else {
        await ServicoRepository.deletarServico(id);
        return res.sendStatus(204);

      }

    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ error, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async servicoFilter(req: Request, res: Response) {
    try {
      const servico = await Servico.find(req.body.filters);
      return res.status(200).json({ servico });
    
    } catch (error) {
      Logger.error(error);
      res.json({ error: true, message: error });
    }
  },
};
export default servicoController;
