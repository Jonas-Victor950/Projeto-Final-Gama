"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ProfissionalServicoController_1 = __importDefault(require("../controllers/ProfissionalServicoController"));
var routerProfServ = express_1.default.Router();
routerProfServ.post("/profissionalservico", ProfissionalServicoController_1.default.criarProfissionalServico);
routerProfServ.get("/profissionalservico", ProfissionalServicoController_1.default.listarProfissionalServico);
routerProfServ.get("/profissionalservico/:id", ProfissionalServicoController_1.default.listarProfissionalServicoId);
routerProfServ.put("/profissionalservico/:id", ProfissionalServicoController_1.default.atualizarProfissionalServico);
routerProfServ.delete("/profissionalservico/:id", ProfissionalServicoController_1.default.deletaProfissionalServico);
exports.default = routerProfServ;
