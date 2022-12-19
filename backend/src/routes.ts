import express from "express";
import ProfissionalController from "./controllers/ProfissionalController";
import ServicoController from "./controllers/servicoControlle";
import ProfissionalServico from "./controllers/ProfissionalServicoController";
const router = express.Router();

// Start of Routes Cliente
// End of Routes Cliente

// Inicio de rotas Profissionais
router.get("/profissionais", ProfissionalController.allProfissionais);
router.get("/profissionais/:id", ProfissionalController.getOneProfissional);
router.post("/profissionais", ProfissionalController.createProfissional);
router.put("/profissionais/:id", ProfissionalController.updateOneProfissional);
router.delete("/profissionais/:id", ProfissionalController.deleteOneProfissional);
// Fim de rotas Profissionais

// Inicio de rotas Serviços
router.post('/servico', ServicoController.criarServico);
router.get('/servico', ServicoController.listarServico);
router.get('/servico/:id', ServicoController.listarServicoId);
router.put('/servico/:id', ServicoController.atulizarServico);
router.delete('/servico/:id', ServicoController.deletaServico)
// Fim de rotas Serviços

// Inicio de rotas ProfisionalServiço
router.post('/profissionalservico', ProfissionalServico.create);
router.get('/profissionalservico', ProfissionalServico.findAll);
router.get('/profissionalservico/:id', ProfissionalServico.findOne);
//router.put('/profissionalservico/:id', ProfissionalServico.update);
// router.delete('/servico/:id', ServicoController.deletaServico)


// Inicio de rotas ProfissionalServiço

export default router;
