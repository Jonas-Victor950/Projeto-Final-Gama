import { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import bcrypty from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../configs/secret";
import Logger from "../database/logger";
import MESSAGE from "../constants/messages";

const AuthController = {
  async loginCliente(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const cliente = await Cliente.findOne({
        email,
      });

      if (!cliente) {
        return res.status(404).json(MESSAGE.ERROR.CLIENTES.CLIENTE_SENHA_EMAIL);
      }

      if (!bcrypty.compareSync(senha, cliente.senha)) {
        return res
          .status(401)
          .json(MESSAGE.ERROR.CLIENTES.CLIENTE_SENHA_EMAIL);
      }

      const token = jwt.sign(
        {
          id: cliente.id,
          email: cliente.email,
        },
        secret.key,
        { expiresIn: "8h" }
      );

      return res.status(200).json({
        error: false,
        message: MESSAGE.SUCCESS.CLIENTES.CLIENTE_LOGIN,
        token,
        cliente,
      });
    
    
    } catch(error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ error, msg: MESSAGE.ERROR.ERROR_CATCH });
      
    }
  },
};

export default AuthController;
