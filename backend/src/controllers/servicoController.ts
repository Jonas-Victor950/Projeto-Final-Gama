import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import MESSAGE from '../constants/messages';
import Logger from '../database/logger';
import { Servico, IServico } from '../models/Servico';
import ServicoRepository from '../repositories/ServicoRepository';

const servicoController = {
  async criarServico(req: Request, res: Response) {
    const { servico, preco, duracao } = req.body;
    const novoServico: IServico = {
      servico,
      preco,
      duracao,
    };
    try {
      const servicos = await ServicoRepository.criarServico(novoServico);
      return res.status(201).json(servicos);
    } catch (error) {
      Logger.error(error);
    }
  },

  async listarServico(req: Request, res: Response) {
    try {
      const servicos = await ServicoRepository.listarServicos();
      if (!servicos) {
        Logger.error(MESSAGE.ERROR.SERVICOS.NONE_SERVICO_UNTIL_NOW);
      }

      return res.status(200).json(servicos);
    } catch (error) {
      Logger.error(error);
    }
  },

  async listarServicoId(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const servicoId = await ServicoRepository.listarServicoId(id);
      if (!servicoId) {
        return res.json(MESSAGE.ERROR.NOT_VALID_ID);
      } else {
        return res.status(200).json(servicoId);
      }
    } catch (error) {
      Logger.error(error);
    }
  },

  async atulizarServico(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const  { servico, preco, duracao } = req.body;

      const servicoAtualizado: IServico = {
        servico,
        preco,
        duracao,
      }

      const servicos = await ServicoRepository.atualizarServico(id, servicoAtualizado);
      
      const newServico2 = await Servico.findById(id);
      if (!newServico2) {
        res.status(404).json(MESSAGE.ERROR.SERVICOS.SERVICO_NOT_FOUND);
        
      } else {
        res.status(200).json(MESSAGE.SUCCESS.SERVICO.SERVICO_SENDING);
      }
    } catch (error) {
      Logger.error(error);
    }
  },

  async deletaServico(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      await ServicoRepository.deletarServico(id);
      return res.sendStatus(204)
    
    } catch (error) {
      Logger.error(error);
    }
  },
};
export default servicoController;
