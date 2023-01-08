import express from "express";
import authController from "../controllers/authController";
import validateClienteLogin from "../validations/auth/login";


const routerLogin = express.Router();

routerLogin.post("/loginCliente", validateClienteLogin, authController.loginCliente)

export default routerLogin;