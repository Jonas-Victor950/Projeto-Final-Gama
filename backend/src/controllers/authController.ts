import { Request, Response } from 'express';
import {Cliente} from "../models/Cliente"
import bcrypty from "bcryptjs";


const AuthController = {

   async loginCliente(req: Request, res: Response ){

    const {email, senha} = req.body

    const cliente = await Cliente.findOne({
      where:{
        email
      }
    });

    if (!cliente){
      return res.status(400).json("email não cadastrado!")

  }

    if(bcrypty.compareSync(senha, cliente.senha)){

      return res.status(401).json("E-mail ou senha inválido, verifique e tente novamente!")

    }

    return res.json("Logado!!!")

  }
};

export default AuthController