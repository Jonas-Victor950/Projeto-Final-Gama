"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var create_1 = __importDefault(require("../validations/clientes/create"));
var clienteController_1 = __importDefault(require("../controllers/clienteController"));
var routerCliente = express_1.default.Router();
routerCliente.post("/cliente", create_1.default, clienteController_1.default.criarCliente);
routerCliente.get("/cliente", clienteController_1.default.listarClientes);
routerCliente.get("/cliente/:id", clienteController_1.default.listarClienteId);
routerCliente.put("/cliente/:id", clienteController_1.default.atualizarCliente);
routerCliente.delete("/cliente/:id", clienteController_1.default.deletarCliente);
//Localizando o cliente pelo nome parcial "Like"
routerCliente.get("/clientes/:nome", clienteController_1.default.localizarClienteNome);
exports.default = routerCliente;
