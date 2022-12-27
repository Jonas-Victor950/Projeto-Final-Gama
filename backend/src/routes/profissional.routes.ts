import express from "express";
import ProfissionalController from "../controllers/ProfissionalController";
import validateCreateProfissional from "../validations/profissionais/create";
const routerProf = express.Router();

routerProf.get("/profissionais", ProfissionalController.allProfissionais);
routerProf.get("/profissionais/:id", ProfissionalController.getOneProfissional);
routerProf.post("/profissionais", validateCreateProfissional, ProfissionalController.createProfissional);
routerProf.put("/profissionais/:id", ProfissionalController.updateOneProfissional);
routerProf.delete("/profissionais/:id", ProfissionalController.deleteOneProfissional);

export default routerProf;