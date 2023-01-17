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
var Agenda_1 = require("../models/Agenda");
var AgendaRepository_1 = __importDefault(require("../repositories/AgendaRepository"));
var ClienteRepository_1 = __importDefault(require("../repositories/ClienteRepository"));
//import Sender from "./sender";
//const sender = new Sender();
var AgendaController = {
    cadastroAgenda: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, profissionalServico, cliente, data, agenda, clienteData, clienteNumero, clienteNome, dataDiaF, dataHoraF, diaHora, message1, agendaCriada, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, profissionalServico = _a.profissionalServico, cliente = _a.cliente, data = _a.data;
                        agenda = {
                            profissionalServico: profissionalServico,
                            cliente: cliente,
                            data: data,
                        };
                        return [4 /*yield*/, ClienteRepository_1.default.listarClienteId(cliente).populate("telefone")];
                    case 1:
                        clienteData = _b.sent();
                        clienteNumero = clienteData === null || clienteData === void 0 ? void 0 : clienteData.telefone;
                        clienteNome = clienteData === null || clienteData === void 0 ? void 0 : clienteData.nome;
                        dataDiaF = new Date(data).toLocaleDateString();
                        dataHoraF = new Date(data).toLocaleTimeString();
                        diaHora = " ".concat(dataDiaF, " \u00E0s ").concat(dataHoraF, "hs ");
                        message1 = "Caro(a) ".concat(clienteNome, ",\n    Obrigado pelo agendamento em nosso sal\u00E3o Beleza da Agenda.\n    Esperamos v\u00EA-lo em ").concat(diaHora, ". \n    Pedimos gentilmente que voc\u00EA chegue 10 a 15 minutos antes do hor\u00E1rio marcado.\n    Caso precise cancelar ou reagendar: \n    Avise-nos com pelo menos 24 horas de anteced\u00EAncia.\n    Estamos ansiosos para v\u00EA-lo em breve!");
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, AgendaRepository_1.default.criarAgenda(agenda)];
                    case 3:
                        agendaCriada = _b.sent();
                        //const zap = await sender.sendText(clienteNumero, message1);
                        return [2 /*return*/, res
                                .status(201)
                                .json({ agendaCriada: agendaCriada, message: messages_1.default.SUCCESS.AGENDA.AGENDA_CREATED })];
                    case 4:
                        error_1 = _b.sent();
                        logger_1.default.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_1, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    allAgenda: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var agenda, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AgendaRepository_1.default.listarAgenda()
                                .populate("profissionalServico")
                                .populate("cliente")];
                    case 1:
                        agenda = _a.sent();
                        return [2 /*return*/, res.status(200).json({ Agenda: agenda })];
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
    allAgendaId: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, agenda, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, AgendaRepository_1.default.listarAgendaId(id)
                                .populate("profissionalServico")
                                .populate("cliente")];
                    case 1:
                        agenda = _a.sent();
                        if (!agenda) {
                            return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.NOT_VALID_ID)];
                        }
                        return [2 /*return*/, res.status(200).json(agenda)];
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
    agendaAtualizada: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, profissionalServico, cliente, data, agenda, agendaAtualizada, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        _a = req.body, profissionalServico = _a.profissionalServico, cliente = _a.cliente, data = _a.data;
                        agenda = {
                            profissionalServico: profissionalServico,
                            cliente: cliente,
                            data: data,
                        };
                        return [4 /*yield*/, AgendaRepository_1.default.atualizarAgenda(id, agenda)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Agenda_1.Agenda.findById(id)
                                .populate("profissionalServico")
                                .populate("cliente")];
                    case 2:
                        agendaAtualizada = _b.sent();
                        if (!agendaAtualizada) {
                            return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.NOT_VALID_ID)];
                        }
                        return [2 /*return*/, res.status(200).json({
                                agendaAtualizada: agendaAtualizada,
                                message: messages_1.default.SUCCESS.AGENDA.AGENDA_UPDATED,
                            })];
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
    excluirAgenda: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, agenda, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, AgendaRepository_1.default.deletarAgendar(id)];
                    case 1:
                        agenda = _a.sent();
                        if (!agenda) {
                            return [2 /*return*/, res.json(messages_1.default.ERROR.NOT_VALID_ID)];
                        }
                        return [2 /*return*/, res.sendStatus(204)];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.default.error(error_5);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_5, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    agendaProfissionais: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var agenda, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AgendaRepository_1.default.agendaProfissionais()];
                    case 1:
                        agenda = _a.sent();
                        return [2 /*return*/, res.status(200).json({ Agenda: agenda })];
                    case 2:
                        error_6 = _a.sent();
                        logger_1.default.error(error_6);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_6, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    agendaProfissionaisData: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var d1, d2, agenda, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        d1 = new Date(req.params.d1);
                        d2 = new Date(req.params.d2);
                        return [4 /*yield*/, AgendaRepository_1.default.agendaProfissionaisData(d1, d2)];
                    case 1:
                        agenda = _a.sent();
                        return [2 /*return*/, res.status(200).json({ Agenda: agenda })];
                    case 2:
                        error_7 = _a.sent();
                        logger_1.default.error(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    //Rotas de acesso a agenda pelo cliente
    agendaClientesData: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var d1, d2, cliId, agenda, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        d1 = new Date(req.params.d1);
                        d2 = new Date(req.params.d2);
                        cliId = new mongoose_1.default.Types.ObjectId(req.params.cliId);
                        return [4 /*yield*/, AgendaRepository_1.default.agendaClienteData(d1, d2, cliId)];
                    case 1:
                        agenda = _a.sent();
                        return [2 /*return*/, res.status(200).json({ Agenda: agenda })];
                    case 2:
                        error_8 = _a.sent();
                        logger_1.default.error(error_8);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_8, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = AgendaController;
