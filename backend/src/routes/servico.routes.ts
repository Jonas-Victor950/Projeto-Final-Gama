import express from "express";
import ServicoController from "../controllers/servicoController";
import validateCreateServico from "../validations/servicos/create";
const routerServico = express.Router();

routerServico.post(
  "/servico",
  validateCreateServico,
  ServicoController.criarServico
);
routerServico.get("/servico", ServicoController.listarServico);
routerServico.get("/servico/:id", ServicoController.listarServicoId);
routerServico.put("/servico/:id", ServicoController.atulizarServico);
routerServico.delete("/servico/:id", ServicoController.deletaServico);
routerServico.post("/servico/filter", ServicoController.servicoFilter);

export default routerServico;
