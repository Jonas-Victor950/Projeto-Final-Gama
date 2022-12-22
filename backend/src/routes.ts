import express from "express";
import ProfissionalController from "./controllers/ProfissionalController";
import ServicoController from "./controllers/servicoController";
import ProfissionalServicoController from "./controllers/ProfissionalServicoController";
import ClienteController from "./controllers/clienteController";
import SenderController from "./controllers/SenderController";
import AgendaController from "./controllers/AgendaController";
const router = express.Router();

// Inicio de rotas Profissionais
router.get("/profissionais", ProfissionalController.allProfissionais);
router.get("/profissionais/:id", ProfissionalController.getOneProfissional);
router.post("/profissionais", ProfissionalController.createProfissional);
router.put("/profissionais/:id", ProfissionalController.updateOneProfissional);
router.delete("/profissionais/:id", ProfissionalController.deleteOneProfissional);
// Fim de rotas Profissionais

// Inicio de rotas Serviços
router.post("/servico", ServicoController.criarServico);
router.get("/servico", ServicoController.listarServico);
router.get("/servico/:id", ServicoController.listarServicoId);
router.put("/servico/:id", ServicoController.atulizarServico);
router.delete("/servico/:id", ServicoController.deletaServico);
// Fim de rotas Serviços

// Inicio de rotas Clientes
router.post("/cliente", ClienteController.criarCliente);
router.get("/cliente", ClienteController.listarClientes);
router.get("/cliente/:id", ClienteController.listarClienteId);
router.put("/cliente/:id", ClienteController.atualizarCliente);
router.delete("/cliente/:id", ClienteController.deletarCliente);
// Fim de rotas Clientes

// Inicio de rotas ProfisionalServiço
router.post("/profissionalservico", ProfissionalServicoController.criarProfissionalServico);
router.get("/profissionalservico", ProfissionalServicoController.listarProfissionalServico);
router.get("/profissionalservico/:id", ProfissionalServicoController.listarProfissionalServicoId);
router.put("/profissionalservico/:id", ProfissionalServicoController.atualizarProfissionalServico);
router.delete("/profissionalservico/:id", ProfissionalServicoController.deletaProfissionalServico);
// Fim de rotas ProfissionalServiço

// Inicio de rotas Agenda
router.post('/agenda', AgendaController.cadastroAgenda);
router.get('/agenda', AgendaController.allAgenda);
router.get('/agenda/:id', AgendaController.allAgendaId);
router.put('/agenda/:id', AgendaController.agendaAtualizada);
router.delete('/agenda/:id', AgendaController.excluirAgenda);
// Fim de rotas agenda

// Inicio de rotas zap zap
router.post("/send", SenderController.createText); // Parte caso queiram testar sem ter que criar um cliente
// Fim de rotas zap zap

export default router;
