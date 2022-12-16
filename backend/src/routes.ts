import express from "express";
import servicoController from "./controllers/servicoControlle";
const router = express.Router();

// Start of Routes Cliente
// End of Routes Cliente

// Inicio de rotas Profissionais
// Fim de rotas Profissionais

// Inicio de rotas Serviços
router.post('/servico', servicoController.criarServico);
router.get('/servico', servicoController.listarServico)
// Fim de rotas Serviços

// Inicio de rotas ProfisionalServiço
// Inicio de rotas ProfissionalServiço

export default router