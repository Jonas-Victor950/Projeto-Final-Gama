// Express
import express from "express";
const router = express.Router();

// Início Imports Controllers
import ProfissionalController from "./controllers/ProfissionalController";
import ServicoController from "./controllers/servicoController";
import ProfissionalServicoController from "./controllers/ProfissionalServicoController";
import ClienteController from "./controllers/clienteController";
import SenderController from "./controllers/SenderController";
import AgendaController from "./controllers/AgendaController";
import AdminController from "./controllers/AdminController";
// Fim Imports Controllers

// Inicio Imports Validations
import validateCreateProfissional from "./validations/profissionais/create";
import validateCreateCliente from "./validations/clientes/create";
import validateCreateServico from "./validations/servicos/create";
import validateCreateAdmin from "./validations/admin/create";
// Fim Imports Validations

// Inicio de rotas Profissionais
router.get("/profissionais", ProfissionalController.allProfissionais);
router.get("/profissionais/:id", ProfissionalController.getOneProfissional);
router.post("/profissionais", validateCreateProfissional,ProfissionalController.createProfissional);
router.put("/profissionais/:id", ProfissionalController.updateOneProfissional);
router.delete("/profissionais/:id", ProfissionalController.deleteOneProfissional);
// Fim de rotas Profissionais

// Inicio de rotas Serviços
router.post("/servico", validateCreateServico, ServicoController.criarServico);
router.get("/servico", ServicoController.listarServico);
router.get("/servico/:id", ServicoController.listarServicoId);
router.put("/servico/:id", ServicoController.atulizarServico);
router.delete("/servico/:id", ServicoController.deletaServico);
// Fim de rotas Serviços

// Inicio de rotas Clientes
router.post("/cliente", validateCreateCliente, ClienteController.criarCliente);
router.get("/cliente", ClienteController.listarClientes);
router.get("/cliente/:id", ClienteController.listarClienteId);
router.put("/cliente/:id", ClienteController.atualizarCliente);
router.delete("/cliente/:id", ClienteController.deletarCliente);
// Fim de rotas Clientes

// Inicio de rotas Admin
router.post("/admin", validateCreateAdmin, AdminController.criarAdmin);
router.get("/admin", AdminController.admin);
router.put("/admin/:id", AdminController.atualizarAdmin);
router.delete("/admin/:id", AdminController.deletarAdmin);
// Inicio de rotas Admin

// Inicio de rotas ProfisionalServiço
router.post("/profissionalservico",ProfissionalServicoController.criarProfissionalServico);
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
