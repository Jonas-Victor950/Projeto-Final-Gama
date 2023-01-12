import { Request, Response } from "express";
import { Cliente } from "../models/Cliente";
import bcrypty from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "../configs/secret";

const AuthController = {
  async loginCliente(req: Request, res: Response) {
  
    const { email, senha } = req.body;

    const cliente = await Cliente.findOne({
      where: {
        email,
      },
    });

    if (!cliente) {
      return res.status(400).json("email não cadastrado!");
    }

    if (!bcrypty.compare(cliente.senha, senha )) {
      return res
        .status(401)
        .json("E-mail ou senha inválido, verifique e tente novamente!");
    }

    const token = jwt.sign(
      {
        id: cliente._id,
       },
      secret.key
      
    );

    

    // const token = jwt.sign({
    //   id: cliente.id,
    // }, process.env.JWT_PASS ?? '', {expiresIn: "8h"} );

    // console.log(token);

    return res.json({error: false, message: 'Cliente logado com sucesso!', token});
  },
};

export default AuthController;
