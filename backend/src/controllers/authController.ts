import { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import bcrypty from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../configs/secret";
import Logger from "../database/logger";

const AuthController = {
  async loginCliente(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const cliente = await Cliente.findOne({
        email,
      });

      if (!cliente) {
        return res.status(400).json("email não cadastrado!");
      }

      if (!bcrypty.compareSync(senha, cliente.senha)) {
        return res
          .status(401)
          .json("E-mail ou senha inválido, verifique e tente novamente!");
      }

      const token = jwt.sign(
        {
          id: cliente.id,
          email: cliente.email,
        },
        secret.key,
        { expiresIn: "8h" }
      );

      return res.json({
        error: false,
        message: "Cliente logado com sucesso!",
        token,
        cliente,
      });
    } catch (error) {
      Logger.error(error);
    }
  },
};

export default AuthController;
