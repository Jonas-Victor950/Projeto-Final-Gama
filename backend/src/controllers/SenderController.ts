import Sender from "./sender";
import { Request, Response } from "express";
import Logger from "../database/logger";
import MESSAGE from "../constants/messages";
const sender = new Sender();

class SenderController {
  static async createText(req: Request, res: Response) {
    const { number, message } = req.body;
    try {
      await sender.sendText(number, message);

      return res.status(200).json("Deu certo");
    } catch (error: any) {
      Logger.error(`${error.message}`);
      return res
        .status(500)
        .json({ success: false, msg: MESSAGE.ERROR.ERROR_CATCH });
    }
  }
}

export default SenderController;
