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
var Servico_1 = require("../models/Servico");
var ServicoRepository_1 = __importDefault(require("../repositories/ServicoRepository"));
var servicoController = {
    criarServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, servico, preco, duracao, descricao, novoServico, servicos, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, servico = _a.servico, preco = _a.preco, duracao = _a.duracao, descricao = _a.descricao;
                        novoServico = {
                            servico: servico,
                            preco: preco,
                            duracao: duracao,
                            descricao: descricao,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ServicoRepository_1.default.criarServico(novoServico)];
                    case 2:
                        servicos = _b.sent();
                        return [2 /*return*/, res.status(201).json(servicos)];
                    case 3:
                        error_1 = _b.sent();
                        logger_1.default.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_1, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    listarServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var servicos, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ServicoRepository_1.default.listarServicos()];
                    case 1:
                        servicos = _a.sent();
                        if (!servicos) {
                            res.status(404).json(messages_1.default.ERROR.SERVICOS.NONE_SERVICO_UNTIL_NOW);
                        }
                        return [2 /*return*/, res.status(200).json(servicos)];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.default.error(error_2);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_2, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    listarServicoId: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, servicoId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, ServicoRepository_1.default.listarServicoId(id)];
                    case 1:
                        servicoId = _a.sent();
                        if (!servicoId) {
                            return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.NOT_VALID_ID)];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json(servicoId)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        logger_1.default.error(error_3);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_3, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    atulizarServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, servico, preco, duracao, descricao, servicoAtualizado, newServico2, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        _a = req.body, servico = _a.servico, preco = _a.preco, duracao = _a.duracao, descricao = _a.descricao;
                        servicoAtualizado = {
                            servico: servico,
                            preco: preco,
                            duracao: duracao,
                            descricao: descricao,
                        };
                        return [4 /*yield*/, ServicoRepository_1.default.atualizarServico(id, servicoAtualizado)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Servico_1.Servico.findById(id)];
                    case 2:
                        newServico2 = _b.sent();
                        if (!newServico2) {
                            res.status(404).json(messages_1.default.ERROR.SERVICOS.SERVICO_NOT_FOUND);
                        }
                        else {
                            res.status(200).json(messages_1.default.SUCCESS.SERVICO.SERVICO_SENDING);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _b.sent();
                        logger_1.default.error(error_4);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_4, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    deletaServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, service, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, Servico_1.Servico.findById(id)];
                    case 1:
                        service = _a.sent();
                        if (!!service) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.SERVICOS.SERVICO_NOT_FOUND)];
                    case 2: return [4 /*yield*/, ServicoRepository_1.default.deletarServico(id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(204)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        logger_1.default.error(error_5);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_5, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    servicoFilter: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var servico, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Servico_1.Servico.find(req.body.filters)];
                    case 1:
                        servico = _a.sent();
                        return [2 /*return*/, res.status(200).json({ servico: servico })];
                    case 2:
                        error_6 = _a.sent();
                        logger_1.default.error(error_6);
                        res.json({ error: true, message: error_6 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = servicoController;
