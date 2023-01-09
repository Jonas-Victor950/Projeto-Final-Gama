// ENV variable
require("dotenv").config();

// Import Logger
import Logger from "./database/logger";

// Import DB
import mongoDB from "./database/app";

// Import middlewares
import handleError from "./middlewares/handleError";

import express from "express";
import cors from "cors";

// Routes
import routerAdmin from "./routes/admin.routes";
import routerServico from "./routes/servico.routes";
import routerAgenda from "./routes/agenda.routes";
import routerCliente from "./routes/cliente.routes";
import routerProf from "./routes/profissional.routes";
import routerProfServ from "./routes/profissionalServico.routes";
import routerLogin from "./routes/login.routes";

async function main() {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    routerAdmin,
    routerServico,
    routerAgenda,
    routerCliente,
    routerProf,
    routerProfServ,
    routerLogin
  );
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
