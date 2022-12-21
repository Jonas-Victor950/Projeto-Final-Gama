"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ProfissionalController_1 = __importDefault(require("./controllers/ProfissionalController"));
var servicoController_1 = __importDefault(require("./controllers/servicoController"));
var ProfissionalServicoController_1 = __importDefault(require("./controllers/ProfissionalServicoController"));
var clienteController_1 = __importDefault(require("./controllers/clienteController"));
var SenderController_1 = __importDefault(require("./controllers/SenderController"));
var router = express_1.default.Router();
// Start of Routes Cliente
// End of Routes Cliente
// Inicio de rotas Profissionais
router.get("/profissionais", ProfissionalController_1.default.allProfissionais);
router.get("/profissionais/:id", ProfissionalController_1.default.getOneProfissional);
router.post("/profissionais", ProfissionalController_1.default.createProfissional);
router.put("/profissionais/:id", ProfissionalController_1.default.updateOneProfissional);
router.delete("/profissionais/:id", ProfissionalController_1.default.deleteOneProfissional);
// Fim de rotas Profissionais
// Inicio de rotas Serviços
router.post("/servico", servicoController_1.default.criarServico);
router.get("/servico", servicoController_1.default.listarServico);
router.get("/servico/:id", servicoController_1.default.listarServicoId);
router.put("/servico/:id", servicoController_1.default.atulizarServico);
router.delete("/servico/:id", servicoController_1.default.deletaServico);
// Fim de rotas Serviços
// Inicio de rotas Clientes
router.post("/cliente", clienteController_1.default.criarCliente);
router.get("/cliente", clienteController_1.default.listarClientes);
router.get("/cliente/:id", clienteController_1.default.listarClienteId);
router.put("/cliente/:id", clienteController_1.default.atualizarCliente);
router.delete("/cliente/:id", clienteController_1.default.deletarCliente);
// Fim de rotas Clientes
// Inicio de rotas ProfisionalServiço
router.post("/profissionalservico", ProfissionalServicoController_1.default.criarProfissionalServico);
router.get("/profissionalservico", ProfissionalServicoController_1.default.listarProfissionalServico);
router.get("/profissionalservico/:id", ProfissionalServicoController_1.default.listarProfissionalServicoId);
router.put("/profissionalservico/:id", ProfissionalServicoController_1.default.atualizarProfissionalServico);
router.delete("/profissionalservico/:id", ProfissionalServicoController_1.default.deletaProfissionalServico);
// Fim de rotas ProfissionalServiço
// Inicio de rotas zap zap
router.post("/send", SenderController_1.default.createText); // Parte caso queiram testar sem ter que criar um cliente
// Fim de rotas zap zap
exports.default = router;
