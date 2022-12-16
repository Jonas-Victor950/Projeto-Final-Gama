import { Request, Response } from "express"
import Logger from "../database/logger"

import Servico from "../models/Servico"

const servicoController = {
    async criarServico(req: Request, res: Response,) {
        const { servico, preco, duracao} = req.body

        try {
            const newService = await Servico.create({
                servico,
                preco,
                duracao
            })

            return res.status(201).json(newService)
        } catch (error) {
            Logger.error(error)
        }
    },

    async listarServico(req: Request, res: Response) {
        try {
            const servicos =  await Servico.find();

            return res.status(200).json(servicos)
        } catch (error) {
            Logger.error(error)
            
        }
    }

}
export default servicoController;