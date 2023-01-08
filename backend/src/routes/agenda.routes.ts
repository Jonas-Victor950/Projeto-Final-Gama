import express from 'express';
import AgendaController from '../controllers/AgendaController';
import auth from "../middlewares/auth"; // rota com senha token



const routerAgenda = express.Router();


routerAgenda.post('/agenda', auth, AgendaController.cadastroAgenda); // rota com senha token
routerAgenda.get('/agenda', auth, AgendaController.allAgenda);
routerAgenda.get('/agenda/:id', auth, AgendaController.allAgendaId);
routerAgenda.put('/agenda/:id', auth, AgendaController.agendaAtualizada);
routerAgenda.delete('/agenda/:id', auth, AgendaController.excluirAgenda);

//Rota para agenda profisionais_serviços
routerAgenda.get('/agendadodia', AgendaController.agendaProfissionais);

export default routerAgenda;
