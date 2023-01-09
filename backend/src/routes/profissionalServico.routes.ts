import express from "express";
import ProfissionalServicoController from "../controllers/ProfissionalServicoController";
const routerProfServ = express.Router();

routerProfServ.post(
  "/profissionalservico",
  ProfissionalServicoController.criarProfissionalServico
);
routerProfServ.get(
  "/profissionalservico",
  ProfissionalServicoController.listarProfissionalServico
);
routerProfServ.get(
  "/profissionalservico/:id",
  ProfissionalServicoController.listarProfissionalServicoId
);
routerProfServ.put(
  "/profissionalservico/:id",
  ProfissionalServicoController.atualizarProfissionalServico
);
routerProfServ.delete(
  "/profissionalservico/:id",
  ProfissionalServicoController.deletaProfissionalServico
);

export default routerProfServ;
