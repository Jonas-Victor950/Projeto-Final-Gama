"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messages_1 = __importDefault(require("../constants/messages"));
const logger_1 = __importDefault(require("../database/logger"));
const Cliente_1 = require("../models/Cliente");
const ClienteRepository_1 = __importDefault(require("../repositories/ClienteRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const clienteController = {
    criarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha, telefone, aniversario, sexo } = req.body;
            const newSenha = bcryptjs_1.default.hashSync(senha, 10);
            const clienteObj = {
                nome: nome,
                email: email,
                senha: newSenha,
                telefone: telefone,
                aniversario: aniversario,
                sexo: sexo,
            };
            try {
                const cliente = yield ClienteRepository_1.default.criarCliente(clienteObj);
                logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_CREATED);
                return res.status(200).json({
                    success: true,
                    msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_CREATED,
                    data: cliente,
                });
            }
            catch (error) {
                logger_1.default.error(error);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    },
    listarClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientes = yield ClienteRepository_1.default.listarClientes(Cliente_1.Cliente);
                if (clientes.length <= 0) {
                    logger_1.default.info(messages_1.default.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW);
                    return res.status(200).json({
                        success: false,
                        msg: messages_1.default.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW,
                    });
                }
                else {
                    logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_FOUND);
                    return res.status(200).json({
                        success: true,
                        msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_FOUND,
                        data: clientes,
                    });
                }
            }
            catch (error) {
                logger_1.default.error(`${error.message}`);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    },
    listarClienteId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id || isNaN(parseInt(req.params.id))) {
                    logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                    return res
                        .status(500)
                        .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID });
                }
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const cliente = yield ClienteRepository_1.default.listarClienteId(id, Cliente_1.Cliente);
                if (!cliente) {
                    logger_1.default.error(messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
                    return res.status(500).json({
                        success: false,
                        msg: messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
                    });
                }
                else {
                    logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_SENDING);
                    return res.json({ success: true, data: cliente });
                }
            }
            catch (error) {
                logger_1.default.error(error);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    },
    atualizarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id || isNaN(parseInt(req.params.id))) {
                    logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                    return res
                        .status(500)
                        .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID });
                }
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const cliente = yield ClienteRepository_1.default.listarClienteId(id, Cliente_1.Cliente);
                if (!cliente) {
                    logger_1.default.error(messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
                    return res.status(500).json({
                        success: false,
                        msg: messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
                    });
                }
                else {
                    const { nome, email, senha, telefone, aniversario, sexo } = req.body;
                    if (!senha) {
                        const clienteobb = {
                            nome: nome,
                            email: email,
                            telefone: telefone,
                            aniversario: aniversario,
                            sexo: sexo,
                        };
                        const updatedCliente = yield ClienteRepository_1.default.atualizarCliente(id, clienteobb);
                        logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_UPDATED);
                        return res.status(200).json({
                            success: true,
                            msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_UPDATED,
                            data: clienteobb,
                        });
                    }
                    else {
                        const newSenha = bcryptjs_1.default.hashSync(senha, 10);
                        const clienteObj = {
                            nome: nome,
                            email: email,
                            senha: newSenha,
                            telefone: telefone,
                            aniversario: aniversario,
                            sexo: sexo,
                        };
                        const updateCliente = yield ClienteRepository_1.default.atualizarCliente(id, clienteObj);
                        logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_UPDATED);
                        return res.status(200).json({
                            success: true,
                            msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_UPDATED,
                            data: clienteObj,
                        });
                    }
                }
            }
            catch (error) {
                logger_1.default.error(error);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    },
    deletarCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id || isNaN(parseInt(req.params.id))) {
                    logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                    return res
                        .status(500)
                        .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID });
                }
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const cliente = yield ClienteRepository_1.default.listarClienteId(id, Cliente_1.Cliente);
                if (!cliente) {
                    logger_1.default.error(messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
                    return res.status(500).json({
                        success: false,
                        msg: messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
                    });
                }
                else {
                    yield ClienteRepository_1.default.deletarCliente(id);
                    logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_DELETED);
                    return res.status(200).json({
                        success: true,
                        msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_DELETED,
                    });
                }
            }
            catch (error) {
                logger_1.default.error(error);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    },
};
// const clienteController = {
//   async criarCliente(req: Request, res: Response) {
//     const { nome, email, senha, telefone, aniversario, sexo } = req.body;
//     const novoCliente: ICliente = {
//       nome,
//       email,
//       senha,
//       telefone,
//       aniversario,
//       sexo,
//     };
//     try {
//       await ClienteRepository.criarCliente(novoCliente);
//       return res.status(201).json(novoCliente);
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
//   async listarClientes(req: Request, res: Response) {
//     try {
//       const clientes = await ClienteRepository.listarClientes();
//       if (!clientes) {
//         Logger.error(MESSAGE.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW);
//       }
//       return res.status(200).json(clientes);
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
//   async listarClienteId(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const clienteId = await ClienteRepository.listarClienteId(id);
//       if (!clienteId) {
//         return res.json(MESSAGE.ERROR.NOT_VALID_ID);
//       } else {
//         return res.status(200).json(clienteId);
//       }
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
//   async atulizarCliente(req: Request, res: Response) {
//     try {
//       const id = new mongoose.Types.ObjectId(req.params.id);
//       const newCliente: {
//         nome: string;
//         email: string;
//         senha: string;
//         telefone: string;
//         aniversario: string;
//         sexo: string;
//       } = req.body;
//       const cliente = await ClienteRepository.atualizarCliente(id, newCliente);
//       const newClienteOk = await cliente.f findById(id);
//       if (!newClienteOk) {
//         res.status(404).json(MESSAGE.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
//       } else {
//         res.status(200).json(MESSAGE.SUCCESS.CLIENTES.CLIENTES_SENDING);
//       }
//     } catch (error) {
//       Logger.error(error);
//     }
//   },
// };
exports.default = clienteController;
