import { Request, Response } from "express";
import { string } from "joi";
import mongoose, { ObjectId } from "mongoose";
import MESSAGE from "../constants/messages";
import Logger from "../database/logger";
import { Agenda, IAgenda } from "../models/Agenda";
import AgendaRepository from "../repositories/AgendaRepository";
import ClienteRepository from "../repositories/ClienteRepository";
import Sender from "./sender";
const sender = new Sender();

const AgendaController = {
  async cadastroAgenda(req: Request, res: Response) {
    const { profissionalServico, cliente, data } = req.body;
    const agenda: IAgenda = {
      profissionalServico,
      cliente,
      data,
    };
    const clienteData = await ClienteRepository.listarClienteId(
      cliente
    ).populate("telefone");

    const clienteNumero = clienteData?.telefone as string;
    const clienteNome = clienteData?.nome as string;
    
    const dataDiaF = new Date(data).toLocaleDateString();
    const dataHoraF = new Date(data).toLocaleTimeString();
    const diaHora = ` ${dataDiaF} às ${dataHoraF}hs `
    
    const message1: string = `Caro(a) ${clienteNome},
    Obrigado pelo agendamento em nosso salão Beleza da Agenda.
    Esperamos vê-lo em ${diaHora}. 
    Pedimos gentilmente que você chegue 10 a 15 minutos antes do horário marcado.
    Caso precise cancelar ou reagendar: 
    Avise-nos com pelo menos 24 horas de antecedência.
    Estamos ansiosos para vê-lo em breve!` as string;
   
    try {
      const agendaCriada = await AgendaRepository.criarAgenda(agenda);
      
      const zap = await sender.sendText(clienteNumero, message1);
      console.log(message1)
      return res
        .status(201)
        .json({ agendaCriada, message: MESSAGE.SUCCESS.AGENDA.AGENDA_CREATED });
    } catch (error) {
      Logger.error(error);
    }
  },

  async allAgenda(req: Request, res: Response) {
    try {
      const agenda = await AgendaRepository.listarAgenda()
        .populate("profissionalServico")
        .populate("cliente");
      return res.status(200).json({ Agenda: agenda });
    } catch (error) {
      Logger.error(error);
    }
  },

  async allAgendaId(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const agenda = await AgendaRepository.listarAgendaId(id)
        .populate("profissionalServico")
        .populate("cliente");
      if (!agenda) {
        return res.status(404).json(MESSAGE.ERROR.NOT_VALID_ID);
      }
      return res.status(200).json(agenda);
    } catch (error) {
      Logger.error(error);
    }
  },

  async agendaAtualizada(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const { profissionalServico, cliente, data } = req.body;
      const agenda: IAgenda = {
        profissionalServico,
        cliente,
        data,
      };

      await AgendaRepository.atualizarAgenda(id, agenda);
      const agendaAtualizada = await Agenda.findById(id)
        .populate("profissionalServico")
        .populate("cliente");

      if (!agendaAtualizada) {
        return res.status(404).json(MESSAGE.ERROR.NOT_VALID_ID);
      }
      return res.status(200).json({
        agendaAtualizada,
        message: MESSAGE.SUCCESS.AGENDA.AGENDA_UPDATED,
      });
    } catch (error) {
      Logger.error(error);
    }
  },

  async excluirAgenda(req: Request, res: Response) {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id);
      const agenda = await AgendaRepository.deletarAgendar(id);
      if (!agenda) {
        res.json(MESSAGE.ERROR.NOT_VALID_ID);
        return;
      }

      return res.sendStatus(204);
    } catch (error) {
      Logger.error(error);
    }
  },

  async agendaProfissionais(req: Request, res: Response) {
    try {
      //const id = new mongoose.Types.ObjectId(req.params.id);
      const agenda = await AgendaRepository.agendaProfissionais();
      return res.status(200).json({ Agenda: agenda });
    } catch (error) {
      Logger.error(error);
    }
  },

  async agendaProfissionaisData(req: Request, res: Response) {
    try {
      //const id = new mongoose.Types.ObjectId(req.params.id);
      const d1 = new Date(req.params.d1);
      const d2 = new Date(req.params.d2);
      const agenda = await AgendaRepository.agendaProfissionaisData(d1, d2);
      return res.status(200).json({ Agenda: agenda });
    } catch (error) {
      Logger.error(error);
    }
  }, //Fim da agendaProffisionaisData

  //Rotas de acesso a agenda pelo cliente
  async agendaClientesData(req: Request, res: Response) {
    try {
      //const id = new mongoose.Types.ObjectId(req.params.id);
      const d1 = new Date(req.params.d1);
      const d2 = new Date(req.params.d2);
      const cliId = new mongoose.Types.ObjectId(req.params.cliId);

      const agenda = await AgendaRepository.agendaClienteData(d1, d2, cliId);

      return res.status(200).json({ Agenda: agenda });
    } catch (error) {
      Logger.error(error);
    }
  },
};

export default AgendaController;
