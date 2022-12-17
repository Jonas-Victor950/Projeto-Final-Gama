import { Request, Response } from "express"
import mongoose from "mongoose";
import MESSAGE from "../constants/messages";
import Logger from "../database/logger"
import { servico, IServico } from "../models/Servico";
import ServicoRepository from "../repositories/ServicoRepository"

const servicoController = {
    async criarServico(req: Request, res: Response,) {
        const { servico, preco, duracao } = req.body;
        const novoServico: IServico = {
            servico,
            preco,
            duracao,
        }
        try {
            await ServicoRepository.criarServico(novoServico)
            return res.status(201).json(novoServico)
        }
        catch (error) {
            Logger.error(error)
        }
    },

    async listarServico(req: Request, res: Response) {
        try {
            const servicos = await ServicoRepository.listarServicos()
            if (!servicos) {
                Logger.error(MESSAGE.ERROR.SERVICOS.NONE_SERVICO_UNTIL_NOW)
            }

            return res.status(200).json(servicos)
        }
        catch (error) {
            Logger.error(error)

        }
    },

    async listarServicoId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const servicoId = await ServicoRepository.listarServicoId(id)
            if (!servicoId) {
                return res.json(MESSAGE.ERROR.NOT_VALID_ID)
            } else {
                return res.status(200).json(servicoId)
            }
        }
        catch (error) {
            Logger.error(error)
        }
    },

    async atulizarServico(req: Request, res: Response) {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id)
            const newServico: { servico: string, preco: string, duracao: string } = req.body;

            const servicos = await ServicoRepository.atualizarServico(
                id,
                newServico

            )

            const newServico2 = await servico.findById(id)
            if (!newServico2) {
                res.status(404).json(MESSAGE.ERROR.SERVICOS.SERVICO_NOT_FOUND)
            } else {
                res.status(200).json(MESSAGE.SUCCESS.SERVICO.SERVICO_SENDING)
            }

        }
        catch (error) {
            Logger.error(error)
        }
    },

    async deletaServico(req: Request, res: Response) {
        try {
            const id = new mongoose.Types.ObjectId(req.params.id)
            const servico = await ServicoRepository.deletarServico(id)
            return res.json(MESSAGE.SUCCESS.SERVICO.SERVICO_DELETED).sendStatus(404)
        }
        catch (error) {
            Logger.error(error)
        }
    }




}
export default servicoController;