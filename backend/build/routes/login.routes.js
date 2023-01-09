"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = __importDefault(require("../controllers/authController"));
var login_1 = __importDefault(require("../validations/auth/login"));
var routerLogin = express_1.default.Router();
routerLogin.post("/loginCliente", login_1.default, authController_1.default.loginCliente);
exports.default = routerLogin;
