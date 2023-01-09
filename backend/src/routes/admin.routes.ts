import express from "express";
import AdminController from "../controllers/AdminController";
import SenderController from "../controllers/SenderController";
import validateCreateAdmin from "../validations/admin/create";
const routerAdmin = express.Router();

routerAdmin.post("/admin", validateCreateAdmin, AdminController.criarAdmin);
routerAdmin.get("/admin", AdminController.admin);
routerAdmin.put("/admin/:id", AdminController.atualizarAdmin);
routerAdmin.delete("/admin/:id", AdminController.deletarAdmin);

// Inicio de rotas zap zap
routerAdmin.post("/send", SenderController.createText); // Parte caso queiram testar sem ter que criar um cliente
// Fim de rotas zap zap

export default routerAdmin;
