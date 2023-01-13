import { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import bcrypty from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../configs/secret";

const AuthController = {
  async loginCliente(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      
      const cliente = await Cliente.findOne({
          email,
      });

      console.log(cliente)

      if (!cliente) {
        return res.status(400).json("email não cadastrado!");
      }

      if (!bcrypty.compareSync(senha, cliente.senha )) {
        
          return res
          .status(401)
          .json("E-mail ou senha inválido, verifique e tente novamente!");
         
      }

      const token = jwt.sign(
        {
          id: cliente._id,
          email: cliente.email,
          senha: cliente.senha
        },
        secret.key
      );

      return res.json({
        error: false,
        message: "Cliente logado com sucesso!",
        token,
      });
    } catch (error) {
      console.log(error)
    }
  },
};

export default AuthController;
