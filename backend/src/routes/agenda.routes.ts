import express from 'express';
import AgendaController from '../controllers/AgendaController';
import auth from '../middlewares/auth'; // rota com senha token

const routerAgenda = express.Router();

routerAgenda.post('/agenda', AgendaController.cadastroAgenda); // rota com senha token
routerAgenda.get('/agenda', auth, AgendaController.allAgenda);
routerAgenda.get('/agenda/:id', auth, AgendaController.allAgendaId);
routerAgenda.put('/agenda/:id', auth, AgendaController.agendaAtualizada);
routerAgenda.delete('/agenda/:id', auth, AgendaController.excluirAgenda);

//Rota para agenda profisionais_serviços
routerAgenda.get('/agendadodia', AgendaController.agendaProfissionais);
routerAgenda.get(
  '/agendaprofissionaisdata/d1/:d1/d2/:d2',
  AgendaController.agendaProfissionaisData
);

export default routerAgenda;
