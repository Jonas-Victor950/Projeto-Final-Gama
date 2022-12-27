"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AdminController_1 = __importDefault(require("../controllers/AdminController"));
var create_1 = __importDefault(require("../validations/admin/create"));
var routerAdmin = express_1.default.Router();
routerAdmin.post("/admin", create_1.default, AdminController_1.default.criarAdmin);
routerAdmin.get("/admin", AdminController_1.default.admin);
routerAdmin.put("/admin/:id", AdminController_1.default.atualizarAdmin);
routerAdmin.delete("/admin/:id", AdminController_1.default.deletarAdmin);
exports.default = routerAdmin;
