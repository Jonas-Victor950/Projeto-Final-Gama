import { Request, Response } from "express";
import mongoose from "mongoose";
import MESSAGE from "../constants/messages";
import Logger from "../database/logger";
import { Admin, IAdmin } from "../models/Admin";
import AdminRepository from "../repositories/AdminRepository";
import bcrypty from "bcryptjs";
import Sender from "./sender";
const sender = new Sender();

const AdminController = {
  async criarAdmin(req: Request, res: Response) {
    const { nome, email, senha } = req.body;
    const newSenha = bcrypty.hashSync(senha, 10);
    const adminObj: IAdmin = {
      nome: nome,
      email: email,
      senha: newSenha,
    };
    try {
      const admin = await AdminRepository.criarAdmin(adminObj);

      Logger.info(MESSAGE.SUCCESS.ADMIN.ADMIN_CREATED);
      return res.status(200).json({
        success: true,
        msg: MESSAGE.SUCCESS.ADMIN.ADMIN_CREATED,
        admin: admin,
      });
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async admin(req: Request, res: Response) {
    try {
      const admin: Array<IAdmin> = await AdminRepository.admin(Admin);

      if (admin.length <= 0) {
        Logger.info(MESSAGE.ERROR.ADMIN.NONE_ADMIN_UNTIL_NOW);
        return res.status(200).json({
          success: false,
          msg: MESSAGE.ERROR.ADMIN.NONE_ADMIN_UNTIL_NOW,
        });
      } else {
        Logger.info(MESSAGE.SUCCESS.ADMIN.ADMIN_FOUND);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.ADMIN.ADMIN_FOUND,
          data: admin,
        });
      }
    } catch (error: any) {
      Logger.error(`${error.message}`);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async atualizarAdmin(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const admin = await AdminRepository.listarAdminId(id, Admin);

      if (!admin) {
        Logger.error(MESSAGE.ERROR.ADMIN.ADMIN_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.ADMIN.ADMIN_NOT_FOUND,
        });
      } else {
        const { nome, email, senha } = req.body;
        if (!senha) {
          const adminobb = {
            nome: nome,
            email: email,
          };
          const updatedAdmin = await AdminRepository.atualizarAdmin(
            id,
            adminobb
          );
          Logger.info(MESSAGE.SUCCESS.ADMIN.ADMIN_UPDATED);
          return res.status(200).json({
            success: true,
            msg: MESSAGE.SUCCESS.ADMIN.ADMIN_UPDATED,
            data: adminobb,
          });
        } else {
          const newSenha = bcrypty.hashSync(senha, 10);
          const adminObj: IAdmin = {
            nome: nome,
            email: email,
            senha: newSenha,
          };
          const updateAdmin = await AdminRepository.atualizarAdmin(
            id,
            adminObj
          );

          Logger.info(MESSAGE.SUCCESS.ADMIN.ADMIN_UPDATED);
          return res.status(200).json({
            success: true,
            msg: MESSAGE.SUCCESS.ADMIN.ADMIN_UPDATED,
            data: adminObj,
          });
        }
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },

  async deletarAdmin(req: Request, res: Response) {
    try {
      if (!req.params.id || isNaN(parseInt(req.params.id))) {
        Logger.error(MESSAGE.ERROR.NOT_VALID_ID);
        return res
          .status(500)
          .json({ success: false, msg: MESSAGE.ERROR.NOT_VALID_ID });
      }

      const id = new mongoose.Types.ObjectId(req.params.id);
      const admin = await AdminRepository.listarAdminId(id, Admin);

      if (!admin) {
        Logger.error(MESSAGE.ERROR.ADMIN.ADMIN_NOT_FOUND);
        return res.status(500).json({
          success: false,
          msg: MESSAGE.ERROR.ADMIN.ADMIN_NOT_FOUND,
        });
      } else {
        await AdminRepository.deletarAdmin(id);

        Logger.info(MESSAGE.SUCCESS.ADMIN.ADMIN_DELETED);
        return res.status(200).json({
          success: true,
          msg: MESSAGE.SUCCESS.ADMIN.ADMIN_DELETED,
        });
      }
    } catch (error) {
      Logger.error(error);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  },
};

export default AdminController;
