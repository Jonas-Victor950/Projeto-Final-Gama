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
const Servico_1 = require("../models/Servico");
const ServicoRepository_1 = __importDefault(require("../repositories/ServicoRepository"));
const servicoController = {
    criarServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { servico, preco, duracao } = req.body;
            const novoServico = {
                servico,
                preco,
                duracao,
            };
            try {
                yield ServicoRepository_1.default.criarServico(novoServico);
                return res.status(201).json(novoServico);
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    listarServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const servicos = yield ServicoRepository_1.default.listarServicos();
                if (!servicos) {
                    logger_1.default.error(messages_1.default.ERROR.SERVICOS.NONE_SERVICO_UNTIL_NOW);
                }
                return res.status(200).json(servicos);
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    listarServicoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const servicoId = yield ServicoRepository_1.default.listarServicoId(id);
                if (!servicoId) {
                    return res.json(messages_1.default.ERROR.NOT_VALID_ID);
                }
                else {
                    return res.status(200).json(servicoId);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    atulizarServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const newServico = req.body;
                const servicos = yield ServicoRepository_1.default.atualizarServico(id, newServico);
                const newServico2 = yield Servico_1.servico.findById(id);
                if (!newServico2) {
                    res.status(404).json(messages_1.default.ERROR.SERVICOS.SERVICO_NOT_FOUND);
                }
                else {
                    res.status(200).json(messages_1.default.SUCCESS.SERVICO.SERVICO_SENDING);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    deletaServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const servico = yield ServicoRepository_1.default.deletarServico(id);
                return res.json(messages_1.default.SUCCESS.SERVICO.SERVICO_DELETED).sendStatus(404);
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
};
exports.default = servicoController;
