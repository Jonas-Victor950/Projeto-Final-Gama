// ENV variable
require("dotenv").config();

import handleError from "./middlewares/handleError";
import express from "express";
import cors from "cors";
import mongoDB from "./database/app";
import router from "./routes";
import Logger from "./database/logger";

async function main() {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(router);
  app.use(handleError);

  app.listen(port, async () => {
    Logger.info(`🚀 Projeto rodando no endereço: http://127.0.0.1:${port}`);

    mongoDB.createConection();
  });
}

main().catch((error) => {
  Logger.error("🥵 Erro!");
  Logger.error(error);
});
