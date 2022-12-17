"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfissionalController_1 = __importDefault(require("./controllers/ProfissionalController"));
const ServicoControlle_1 = __importDefault(require("./controllers/ServicoControlle"));
const router = express_1.default.Router();
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
router.post('/servico', ServicoControlle_1.default.criarServico);
router.get('/servico', ServicoControlle_1.default.listarServico);
router.get('/servico/:id', ServicoControlle_1.default.listarServicoId);
router.put('/servico/:id', ServicoControlle_1.default.atulizarServico);
router.delete('/servico/:id', ServicoControlle_1.default.deletaServico);
// Fim de rotas Serviços
// Inicio de rotas ProfisionalServiço
// Inicio de rotas ProfissionalServiço
exports.default = router;
