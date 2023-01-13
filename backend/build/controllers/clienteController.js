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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var messages_1 = __importDefault(require("../constants/messages"));
var logger_1 = __importDefault(require("../database/logger"));
var Cliente_1 = require("../models/Cliente");
var ClienteRepository_1 = __importDefault(require("../repositories/ClienteRepository"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// import Sender from './sender';
// const sender = new Sender();
var clienteController = {
    criarCliente: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, email, senha, telefone, aniversario, sexo, newSenha, clienteObj, cliente, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha, telefone = _a.telefone, aniversario = _a.aniversario, sexo = _a.sexo;
                        newSenha = bcryptjs_1.default.hashSync(senha, 10);
                        clienteObj = {
                            nome: nome,
                            email: email,
                            senha: newSenha,
                            telefone: telefone,
                            aniversario: aniversario,
                            sexo: sexo,
                        };
                        return [4 /*yield*/, Cliente_1.Cliente.findOne({ $or: [{ email: email }] })];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(422).json(messages_1.default.ERROR.CLIENTES.CLIENTE_EMAIL_ERROR)];
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, ClienteRepository_1.default.criarCliente(clienteObj)];
                    case 3:
                        cliente = _b.sent();
                        // await sender.sendText(telefone, message);
                        logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_CREATED);
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_CREATED,
                                cliente: cliente,
                            })];
                    case 4:
                        error_1 = _b.sent();
                        logger_1.default.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    listarClientes: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var clientes, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ClienteRepository_1.default.listarClientes(Cliente_1.Cliente)];
                    case 1:
                        clientes = _a.sent();
                        if (clientes.length <= 0) {
                            logger_1.default.info(messages_1.default.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW);
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    msg: messages_1.default.ERROR.CLIENTES.NONE_CLIENTE_UNTIL_NOW,
                                })];
                        }
                        else {
                            logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_FOUND);
                            return [2 /*return*/, res.status(200).json({
                                    success: true,
                                    msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_FOUND,
                                    data: clientes,
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.default.error("".concat(error_2.message));
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    listarClienteId: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, cliente, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.params.id || isNaN(parseInt(req.params.id))) {
                            logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                            return [2 /*return*/, res
                                    .status(500)
                                    .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID })];
                        }
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, ClienteRepository_1.default.listarClienteId(id)];
                    case 1:
                        cliente = _a.sent();
                        if (!cliente) {
                            logger_1.default.error(messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    msg: messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
                                })];
                        }
                        else {
                            logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_SENDING);
                            return [2 /*return*/, res.json({ success: true, data: cliente })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        logger_1.default.error(error_3);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    atualizarCliente: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, cliente, _a, nome, email, senha, telefone, aniversario, sexo, newSenha, clienteObj, updateCliente, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!req.params.id || isNaN(parseInt(req.params.id))) {
                            logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                            return [2 /*return*/, res
                                    .status(500)
                                    .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID })];
                        }
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, ClienteRepository_1.default.listarClienteId(id)];
                    case 1:
                        cliente = _b.sent();
                        if (!cliente) {
                            logger_1.default.error(messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    msg: messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
                                })];
                        }
                        _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha, telefone = _a.telefone, aniversario = _a.aniversario, sexo = _a.sexo;
                        newSenha = bcryptjs_1.default.hashSync(senha, 10);
                        clienteObj = {
                            nome: nome,
                            email: email,
                            senha: newSenha,
                            telefone: telefone,
                            aniversario: aniversario,
                            sexo: sexo,
                        };
                        return [4 /*yield*/, ClienteRepository_1.default.atualizarCliente(id, clienteObj)];
                    case 2:
                        updateCliente = _b.sent();
                        logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_UPDATED);
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_UPDATED,
                                data: clienteObj,
                            })];
                    case 3:
                        error_4 = _b.sent();
                        logger_1.default.error(error_4);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    deletarCliente: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, cliente, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!req.params.id || isNaN(parseInt(req.params.id))) {
                            logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                            return [2 /*return*/, res
                                    .status(500)
                                    .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID })];
                        }
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, ClienteRepository_1.default.listarClienteId(id)];
                    case 1:
                        cliente = _a.sent();
                        if (!!cliente) return [3 /*break*/, 2];
                        logger_1.default.error(messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND);
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                msg: messages_1.default.ERROR.CLIENTES.CLIENTE_NOT_FOUND,
                            })];
                    case 2: return [4 /*yield*/, ClienteRepository_1.default.deletarCliente(id)];
                    case 3:
                        _a.sent();
                        logger_1.default.info(messages_1.default.SUCCESS.CLIENTES.CLIENTE_DELETED);
                        return [2 /*return*/, res.status(204).json({
                                success: true,
                                msg: messages_1.default.SUCCESS.CLIENTES.CLIENTE_DELETED,
                            })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        logger_1.default.error(error_5);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 6: return [2 /*return*/];
                }
            });
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
