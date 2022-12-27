import express from "express";
import AgendaController from "../controllers/AgendaController";
const routerAgenda = express.Router();

routerAgenda.post('/agenda', AgendaController.cadastroAgenda);
routerAgenda.get('/agenda', AgendaController.allAgenda);
routerAgenda.get('/agenda/:id', AgendaController.allAgendaId);
routerAgenda.put('/agenda/:id', AgendaController.agendaAtualizada);
routerAgenda.delete('/agenda/:id', AgendaController.excluirAgenda);


export default routerAgenda;