import { Request, Response } from 'express';
import mongoose from 'mongoose';
import MESSAGE from '../constants/messages';
import Logger from '../database/logger';
import { Cliente, ICliente } from '../models/Cliente';
import ClienteRepository from '../repositories/ClienteRepository';
import bcrypty from 'bcryptjs';
import Sender from './sender';
const sender = new Sender();

const clienteController = {
  async criarCliente(req: Request, res: Response) {
    const { nome, email, senha, telefone, aniversario, sexo } = req.body;
    const newSenha = bcrypty.hashSync(senha, 10);
    const clienteObj: ICliente = {
      nome: nome,
      email: email,
      senha: newSenha,
      telefone: telefone,
      aniversario: aniversario,
      sexo: sexo,
    };
    // const message: string = `Obrigado por se cadastrar ${nome}` as string;

    if (await Cliente.findOne({ $or: [{ email: email }] })) {
      return res.status(422).json(MESSAGE.ERROR.CLIENTES.CLIENTE_EMAIL_ERROR);
    } else {
      try {
        const cliente = await ClienteRepository.criarCliente(clienteObj);

        // const zap = await sender.sendText(telefone, message);

        Logger.info(MESSAGE.SUCCESS.CLIENTES.CLIENTE_CREATED);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.CLIENTES.CLIENTE_CREATED,
          cliente: cliente,
        });
      } catch (error) {
        Logger.error(error);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
      }
    }
  },

  async listarClientes(req: Request, res: Response) {
    try {
      const clientes: Array<ICliente> = await ClienteRepository.listarClientes(
        Cliente
      );

      if (clientes.length <= 0) {
        Logger.info(MESSAGE.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW);
        return res.status(200).json({
          success: false,
          msg: MESSAGE.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW,
        });
      } else {
        Logger.info(MESSAGE.SUCCESS.CLIENTES.CLIENTE_FOUND);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.CLIENTES.CLIENTE_FOUND,
          data: clientes,
        });
      }
    } catch (error: any) {
      Logger.error(`${error.message}`);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async listarClienteId(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const cliente = await ClienteRepository.listarClienteId(id);

      if (!cliente) {
        Logger.error(MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
        });
      } else {
        Logger.info(MESSAGE.SUCCESS.CLIENTES.CLIENTE_SENDING);
        return res.json({ success: true, data: cliente });
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async atualizarCliente(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const cliente = await ClienteRepository.listarClienteId(id);

      if (!cliente) {
        Logger.error(MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
        });
      }

      const { nome, email, senha, telefone, aniversario, sexo } = req.body;
      const newSenha = bcrypty.hashSync(senha, 10);
      const clienteObj: ICliente = {
        nome,
        email,
        senha: newSenha,
        telefone,
        aniversario,
        sexo,
      };
      const updateCliente = await ClienteRepository.atualizarCliente(
        id,
        clienteObj
      );

      Logger.info(MESSAGE.SUCCESS.CLIENTES.CLIENTE_UPDATED);
      return res.status(200).json({
        success: true,
        msg: MESSAGE.SUCCESS.CLIENTES.CLIENTE_UPDATED,
        data: clienteObj,
      });
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async deletarCliente(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const cliente = await ClienteRepository.listarClienteId(id);

      if (!cliente) {
        Logger.error(MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
        });
      } else {
        await ClienteRepository.deletarCliente(id);

        Logger.info(MESSAGE.SUCCESS.CLIENTES.CLIENTE_DELETED);
        return res.status(204).json({
          success: true,
          msg: MESSAGE.SUCCESS.CLIENTES.CLIENTE_DELETED,
        });
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  //Localizando o cliente pelo nome "Like"
  //url = http://127.0.0.1:3000/clientes/ <- apos aqui passar o parametro a ser localizado
  //Exe.: http://127.0.0.1:3000/clientes/Marcos <-- este parametro pode ser maiúsculo ou minúsculo
  async localizarClienteNome(req: Request, res: Response) {
    try {
      const clientes: Array<ICliente> =
        await ClienteRepository.localizarClientesNome(req.params.nome);

      if (clientes.length <= 0) {
        Logger.info(MESSAGE.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW);
        return res.status(200).json({
          success: false,
          msg: MESSAGE.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW,
        });
      } else {
        Logger.info(MESSAGE.SUCCESS.CLIENTES.CLIENTE_FOUND);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.CLIENTES.CLIENTE_FOUND,
          data: clientes,
        });
      }
    } catch (error: any) {
      Logger.error(`${error.message}`);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },
};

// const clienteController = {
//   async criarCliente(req: Request, res: Response) {
//     const { nome, email, senha, telefone, aniversario, sexo } = req.body;
//     const novoCliente: ICliente = {
//       nome,
//       email,
//       senha,
//       telefone,
//       aniversario,
//       sexo,
//     };
//     try {
//       await ClienteRepository.criarCliente(novoCliente);
//       return res.status(201).json(novoCliente);
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
//   async listarClientes(req: Request, res: Response) {
//     try {
//       const clientes = await ClienteRepository.listarClientes();
//       if (!clientes) {
//         Logger.error(MESSAGE.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW);
//       }

//       return res.status(200).json(clientes);
//     } catch (error) {
//       Logger.error(error);
//     }
//   },

//   async listarClienteId(req: Request, res: Response) {
//     try {
//       const { id } = req.params;

//       const clienteId = await ClienteRepository.listarClienteId(id);
//       if (!clienteId) {
//         return res.json(MESSAGE.ERROR.NOT_VALID_ID);
//       } else {
//         return res.status(200).json(clienteId);
//       }
//     } catch (error) {
//       Logger.error(error);
//     }
//   },

//   async atulizarCliente(req: Request, res: Response) {
//     try {
//       const id = new mongoose.Types.ObjectId(req.params.id);
//       const newCliente: {
//         nome: string;
//         email: string;
//         senha: string;
//         telefone: string;
//         aniversario: string;
//         sexo: string;
//       } = req.body;

//       const cliente = await ClienteRepository.atualizarCliente(id, newCliente);

//       const newClienteOk = await cliente.f findById(id);
//       if (!newClienteOk) {
//         res.status(404).json(MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
//       } else {
//         res.status(200).json(MESSAGE.SUCCESS.CLIENTES.CLIENTES_SENDING);
//       }
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
// };

export default clienteController;
