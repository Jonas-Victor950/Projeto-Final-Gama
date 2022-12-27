import express from "express";
import validateCreateCliente from "../validations/clientes/create";
import ClienteController from "../controllers/clienteController";
const routerCliente = express.Router();

routerCliente.post("/cliente", validateCreateCliente, ClienteController.criarCliente);
routerCliente.get("/cliente", ClienteController.listarClientes);
routerCliente.get("/cliente/:id", ClienteController.listarClienteId);
routerCliente.put("/cliente/:id", ClienteController.atualizarCliente);
routerCliente.delete("/cliente/:id", ClienteController.deletarCliente);


export default routerCliente;