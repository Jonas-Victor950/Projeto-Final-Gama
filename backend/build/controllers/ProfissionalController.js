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
const Profissional_1 = require("../models/Profissional");
const ProfissionalRepository_1 = __importDefault(require("../repositories/ProfissionalRepository"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ProfissionalController {
    static allProfissionais(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profissionais = yield ProfissionalRepository_1.default.getAllProfissionais(Profissional_1.Profissional);
                if (profissionais.length <= 0) {
                    logger_1.default.info(messages_1.default.ERROR.PROFISSIONAIS.NONE_PROFSSIONAL_UNTIL_NOW);
                    return res.status(200).json({
                        success: false,
                        msg: messages_1.default.ERROR.PROFISSIONAIS.NONE_PROFSSIONAL_UNTIL_NOW,
                    });
                }
                else {
                    logger_1.default.info(messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONALS_FOUND);
                    return res.status(200).json({
                        success: true,
                        msg: messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONALS_FOUND,
                        data: profissionais,
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
    }
    static getOneProfissional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id || isNaN(parseInt(req.params.id))) {
                    logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                    return res
                        .status(500)
                        .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID });
                }
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const profissional = yield ProfissionalRepository_1.default.getOneProfissional(id, Profissional_1.Profissional);
                if (!profissional) {
                    logger_1.default.error(messages_1.default.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND);
                    return res.status(500).json({
                        success: false,
                        msg: messages_1.default.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND,
                    });
                }
                else {
                    logger_1.default.info(messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_SENDING);
                    return res.json({ success: true, data: profissional });
                }
            }
            catch (error) {
                logger_1.default.error(error);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    }
    static createProfissional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha, telefone, sexo } = req.body;
            const newSenha = bcryptjs_1.default.hashSync(senha, 10);
            const profissionalObj = {
                nome: nome,
                email: email,
                senha: newSenha,
                telefone: telefone,
                sexo: sexo,
            };
            try {
                const profissional = yield ProfissionalRepository_1.default.createProfissional(profissionalObj);
                logger_1.default.info(messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_CREATED);
                return res.status(200).json({
                    success: true,
                    msg: messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_CREATED,
                    data: profissional,
                });
            }
            catch (error) {
                logger_1.default.error(error);
                return res
                    .status(500)
                    .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH });
            }
        });
    }
    static updateOneProfissional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id || isNaN(parseInt(req.params.id))) {
                    logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                    return res
                        .status(500)
                        .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID });
                }
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const profissional = yield ProfissionalRepository_1.default.getOneProfissional(id, Profissional_1.Profissional);
                if (!profissional) {
                    logger_1.default.error(messages_1.default.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND);
                    return res.status(500).json({
                        success: false,
                        msg: messages_1.default.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND,
                    });
                }
                else {
                    const { nome, email, senha, telefone, sexo } = req.body;
                    if (!senha) {
                        const profissionalobb = {
                            nome: nome,
                            email: email,
                            telefone: telefone,
                            sexo: sexo,
                        };
                        const updated1Profissional = yield ProfissionalRepository_1.default.updateProfissional(id, profissionalobb);
                        logger_1.default.info(messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED);
                        return res.status(200).json({
                            success: true,
                            msg: messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED,
                            data: profissionalobb,
                        });
                    }
                    else {
                        const newSenha = bcryptjs_1.default.hashSync(senha, 10);
                        const profissionalObj = {
                            nome: nome,
                            email: email,
                            senha: newSenha,
                            telefone: telefone,
                            sexo: sexo,
                        };
                        const updatedProfissional = yield ProfissionalRepository_1.default.updateProfissional(id, profissionalObj);
                        logger_1.default.info(messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED);
                        return res.status(200).json({
                            success: true,
                            msg: messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_UPDATED,
                            data: profissionalObj,
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
    }
    static deleteOneProfissional(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.id || isNaN(parseInt(req.params.id))) {
                    logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                    return res
                        .status(500)
                        .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID });
                }
                const id = new mongoose_1.default.Types.ObjectId(req.params.id);
                const profissional = yield ProfissionalRepository_1.default.getOneProfissional(id, Profissional_1.Profissional);
                if (!profissional) {
                    logger_1.default.error(messages_1.default.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND);
                    return res.status(500).json({
                        success: false,
                        msg: messages_1.default.ERROR.PROFISSIONAIS.PROFISSIONAL_NOT_FOUND,
                    });
                }
                else {
                    yield ProfissionalRepository_1.default.deleteProfissional(id);
                    logger_1.default.info(messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_DELETED);
                    return res.status(200).json({
                        success: true,
                        msg: messages_1.default.SUCCESS.PROFISSIONAIS.PROFISSIONAL_DELETED,
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
    }
}
exports.default = ProfissionalController;
