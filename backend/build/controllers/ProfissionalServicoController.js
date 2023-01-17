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
var logger_1 = __importDefault(require("../database/logger"));
var ProfissionalServico_1 = require("../models/ProfissionalServico");
var ProfissionalServicoRepository_1 = __importDefault(require("../repositories/ProfissionalServicoRepository"));
var mongoose_1 = __importDefault(require("mongoose"));
var messages_1 = __importDefault(require("../constants/messages"));
var ProfissionalServicoController = {
    criarProfissionalServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, profissional, servico, novoProfissionalServico, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, profissional = _a.profissional, servico = _a.servico;
                        novoProfissionalServico = {
                            profissional: profissional,
                            servico: servico,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ProfissionalServicoRepository_1.default.criarProfissionalServico(novoProfissionalServico)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json(novoProfissionalServico)];
                    case 3:
                        error_1 = _b.sent();
                        logger_1.default.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_1, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 4: return [2 /*return*/, res.status(201).json(novoProfissionalServico)];
                }
            });
        });
    },
    listarProfissionalServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var profissionalServicos, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ProfissionalServicoRepository_1.default.listarProfissionalServico()
                                .populate("profissional")
                                .populate("servico")];
                    case 1:
                        profissionalServicos = _a.sent();
                        if (!profissionalServicos) {
                            logger_1.default.error(messages_1.default.ERROR.PROFISSIONALSERVICOS.NONE_PROFISSIONALSERVICO_UNTIL_NOW);
                        }
                        return [2 /*return*/, res.status(200).json(profissionalServicos)];
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
    listarProfissionalServicoId: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, profissionalServicoId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, ProfissionalServicoRepository_1.default.listarProfissionalServicoId(id)
                                .populate("profissional")
                                .populate("servico")];
                    case 1:
                        profissionalServicoId = _a.sent();
                        if (!profissionalServicoId) {
                            return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.NOT_VALID_ID)];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json(profissionalServicoId)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        logger_1.default.error(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    atualizarProfissionalServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, newProfissionalServico, newProfissionalServico2, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        newProfissionalServico = req.body;
                        return [4 /*yield*/, ProfissionalServicoRepository_1.default.atualizarProfissionalServico(id, newProfissionalServico)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ProfissionalServico_1.profissionalServico.findById(id)];
                    case 2:
                        newProfissionalServico2 = _a.sent();
                        if (!newProfissionalServico2) {
                            res
                                .status(404)
                                .json(messages_1.default.ERROR.PROFISSIONALSERVICOS.PROFISSIONALSERVICO_NOT_FOUND);
                        }
                        else {
                            res
                                .status(200)
                                .json(messages_1.default.SUCCESS.PROFISSIONALSERVICO.PROFISSIONALSERVICO_SENDING);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        logger_1.default.error(error_4);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_4, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    deletaProfissionalServico: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, profissionalService, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, ProfissionalServico_1.profissionalServico.findById(id)];
                    case 1:
                        profissionalService = _a.sent();
                        if (!!profissionalService) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.NOT_VALID_ID)];
                    case 2: return [4 /*yield*/, ProfissionalServicoRepository_1.default.deletarProfissionalServico(id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res
                                .json(messages_1.default.SUCCESS.PROFISSIONALSERVICO.PROFISSIONALSERVICO_DELETED)
                                .sendStatus(204)];
                    case 4:
                        ;
                        return [3 /*break*/, 6];
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
};
exports.default = ProfissionalServicoController;
