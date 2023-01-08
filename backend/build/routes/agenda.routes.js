"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AgendaController_1 = __importDefault(require("../controllers/AgendaController"));
var routerAgenda = express_1.default.Router();
routerAgenda.post('/agenda', AgendaController_1.default.cadastroAgenda);
routerAgenda.get('/agenda', AgendaController_1.default.allAgenda);
routerAgenda.get('/agenda/:id', AgendaController_1.default.allAgendaId);
routerAgenda.put('/agenda/:id', AgendaController_1.default.agendaAtualizada);
routerAgenda.delete('/agenda/:id', AgendaController_1.default.excluirAgenda);
//Rota para agenda profisionais_serviços
routerAgenda.get('/agendadodia', AgendaController_1.default.agendaProfissionais);
exports.default = routerAgenda;
