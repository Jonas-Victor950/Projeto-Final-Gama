"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var servicoController_1 = __importDefault(require("../controllers/servicoController"));
var create_1 = __importDefault(require("../validations/servicos/create"));
var routerServico = express_1.default.Router();
routerServico.post("/servico", create_1.default, servicoController_1.default.criarServico);
routerServico.get("/servico", servicoController_1.default.listarServico);
routerServico.get("/servico/:id", servicoController_1.default.listarServicoId);
routerServico.put("/servico/:id", servicoController_1.default.atulizarServico);
routerServico.delete("/servico/:id", servicoController_1.default.deletaServico);
routerServico.post("/servico/filter", servicoController_1.default.servicoFilter);
exports.default = routerServico;
