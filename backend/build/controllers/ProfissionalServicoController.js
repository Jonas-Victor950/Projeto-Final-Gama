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
const logger_1 = __importDefault(require("../database/logger"));
const ProfissionalServico_1 = require("../models/ProfissionalServico");
const ProfissionalServicoRepository_1 = __importDefault(require("../repositories/ProfissionalServicoRepository"));
const mongoose_1 = __importDefault(require("mongoose"));
const messages_1 = __importDefault(require("../constants/messages"));
const ProfissionalServicoController = {
    criarProfissionalServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { profissional, servico } = req.body;
            const novoProfissionalServico = {
                profissional,
                servico,
            };
            try {
                yield ProfissionalServicoRepository_1.default.criarProfissionalServico(novoProfissionalServico);
                return res.status(201).json(novoProfissionalServico);
            }
            catch (error) {
                logger_1.default.error(error);
            }
            return res.status(201).json(novoProfissionalServico);
        });
    },
    listarProfissionalServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profissionalServicos = yield ProfissionalServicoRepository_1.default.listarProfissionalServico().populate('profissional').populate('servico');
                if (!profissionalServicos) {
                    logger_1.default.error(messages_1.default.ERROR.PROFISSIONALSERVICOS.NONE_PROFISSIONALSERVICO_UNTIL_NOW);
                }
                return res.status(200).json(profissionalServicos);
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    listarProfissionalServicoId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const profissionalServicoId = yield ProfissionalServicoRepository_1.default.listarProfissionalServicoId(id).populate('profissional').populate('servico');
                if (!profissionalServicoId) {
                    return res.json(messages_1.default.ERROR.NOT_VALID_ID);
                }
                else {
                    return res.status(200).json(profissionalServicoId);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    atualizarProfissionalServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const newProfissionalServico = req.body;
                const profissionalServicos = yield ProfissionalServicoRepository_1.default.atualizarProfissionalServico(id, newProfissionalServico);
                const newProfissionalServico2 = yield ProfissionalServico_1.profissionalServico.findById(id);
                if (!newProfissionalServico2) {
                    res.status(404).json(messages_1.default.ERROR.PROFISSIONALSERVICOS.PROFISSIONALSERVICO_NOT_FOUND);
                }
                else {
                    res.status(200).json(messages_1.default.SUCCESS.PROFISSIONALSERVICO.PROFISSIONALSERVICO_SENDING);
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    deletaProfissionalServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const profissionalServico = yield ProfissionalServicoRepository_1.default.deletarProfissionalServico(id);
                return res.json(messages_1.default.SUCCESS.PROFISSIONALSERVICO.PROFISSIONALSERVICO_DELETED).sendStatus(404);
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    }
};
exports.default = ProfissionalServicoController;
