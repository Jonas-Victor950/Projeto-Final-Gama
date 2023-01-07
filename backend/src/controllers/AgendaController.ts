import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import MESSAGE from '../constants/messages';
import Logger from '../database/logger';
import { Agenda, IAgenda } from "../models/Agenda";
import { Cliente } from '../models/Cliente';
import AgendaRepository from '../repositories/AgendaRepository';
import ClienteRepository from '../repositories/ClienteRepository';

const AgendaController = {
    async cadastroAgenda(req: Request, res: Response) {
        const { profissionalServico, cliente, data } = req.body
        const agenda: IAgenda = {
            profissionalServico,
            cliente,
            data,
        }
        const clienteData = await ClienteRepository.listarClienteId(cliente).populate("telefone")
        const clienteNumero = clienteData?.telefone
        console.log(clienteNumero)
        try {
            const agendaCriada = await AgendaRepository.criarAgenda(agenda)
            return res.status(201).json({ agendaCriada, message: MESSAGE.SUCCESS.AGENDA.AGENDA_CREATED})

        } catch (error) {
            Logger.error(error)
        }
    },

    async allAgenda(req: Request, res: Response) {
        try {
            const agenda = await AgendaRepository.listarAgenda().populate('profissionalServico').populate('cliente')
            return res.status(200).json({Agenda: agenda})

        } catch (error) {
            Logger.error(error)
        }
    },

    async allAgendaId(req: Request, res: Response) {
        try {

            const id = new mongoose.Types.ObjectId(req.params.id)
            const agenda = await AgendaRepository.listarAgendaId(id).populate('profissionalServico').populate('cliente');
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
                data
            }

            await AgendaRepository.atualizarAgenda(id, agenda);
            const agendaAtualizada = await Agenda.findById(id).populate('profissionalServico').populate('cliente');

            if(!agendaAtualizada) {
                return res.status(404).json(MESSAGE.ERROR.NOT_VALID_ID);
            }
            return res.status(200).json({agendaAtualizada, message: MESSAGE.SUCCESS.AGENDA.AGENDA_UPDATED})

        } catch (error) {
            Logger.error(error)
        }
    },

    async excluirAgenda(req: Request, res: Response) {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id);
            const agenda = await AgendaRepository.deletarAgendar(id)
            if(!agenda) {
                res.json(MESSAGE.ERROR.NOT_VALID_ID)
                return
            }

            return res.sendStatus(204);

        } catch (error) {
            Logger.error(error)
        }
    }
}

export default AgendaController;