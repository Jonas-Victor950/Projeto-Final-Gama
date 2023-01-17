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
var Admin_1 = require("../models/Admin");
var AdminRepository_1 = __importDefault(require("../repositories/AdminRepository"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var sender_1 = __importDefault(require("./sender"));
var sender = new sender_1.default();
var AdminController = {
    criarAdmin: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, email, senha, newSenha, adminObj, admin, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha;
                        newSenha = bcryptjs_1.default.hashSync(senha, 10);
                        adminObj = {
                            nome: nome,
                            email: email,
                            senha: newSenha,
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, AdminRepository_1.default.criarAdmin(adminObj)];
                    case 2:
                        admin = _b.sent();
                        logger_1.default.info(messages_1.default.SUCCESS.ADMIN.ADMIN_CREATED);
                        return [2 /*return*/, res.status(201).json({
                                success: true,
                                msg: messages_1.default.SUCCESS.ADMIN.ADMIN_CREATED,
                                admin: admin,
                            })];
                    case 3:
                        error_1 = _b.sent();
                        logger_1.default.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    admin: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var admin, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, AdminRepository_1.default.admin(Admin_1.Admin)];
                    case 1:
                        admin = _a.sent();
                        if (admin.length <= 0) {
                            logger_1.default.info(messages_1.default.ERROR.ADMIN.NONE_ADMIN_UNTIL_NOW);
                            return [2 /*return*/, res.status(404).json({
                                    success: false,
                                    msg: messages_1.default.ERROR.ADMIN.NONE_ADMIN_UNTIL_NOW,
                                })];
                        }
                        else {
                            logger_1.default.info(messages_1.default.SUCCESS.ADMIN.ADMIN_FOUND);
                            return [2 /*return*/, res.status(200).json({
                                    success: true,
                                    msg: messages_1.default.SUCCESS.ADMIN.ADMIN_FOUND,
                                    data: admin,
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
    atualizarAdmin: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, admin, _a, nome, email, senha, adminobb, updatedAdmin, newSenha, adminObj, updateAdmin, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        if (!req.params.id || isNaN(parseInt(req.params.id))) {
                            logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID })];
                        }
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, AdminRepository_1.default.listarAdminId(id, Admin_1.Admin)];
                    case 1:
                        admin = _b.sent();
                        if (!!admin) return [3 /*break*/, 2];
                        logger_1.default.error(messages_1.default.ERROR.ADMIN.ADMIN_NOT_FOUND);
                        return [2 /*return*/, res.status(404).json({
                                success: false,
                                msg: messages_1.default.ERROR.ADMIN.ADMIN_NOT_FOUND,
                            })];
                    case 2:
                        _a = req.body, nome = _a.nome, email = _a.email, senha = _a.senha;
                        if (!!senha) return [3 /*break*/, 4];
                        adminobb = {
                            nome: nome,
                            email: email,
                        };
                        return [4 /*yield*/, AdminRepository_1.default.atualizarAdmin(id, adminobb)];
                    case 3:
                        updatedAdmin = _b.sent();
                        logger_1.default.info(messages_1.default.SUCCESS.ADMIN.ADMIN_UPDATED);
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                msg: messages_1.default.SUCCESS.ADMIN.ADMIN_UPDATED,
                                data: adminobb,
                            })];
                    case 4:
                        newSenha = bcryptjs_1.default.hashSync(senha, 10);
                        adminObj = {
                            nome: nome,
                            email: email,
                            senha: newSenha,
                        };
                        return [4 /*yield*/, AdminRepository_1.default.atualizarAdmin(id, adminObj)];
                    case 5:
                        updateAdmin = _b.sent();
                        logger_1.default.info(messages_1.default.SUCCESS.ADMIN.ADMIN_UPDATED);
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                msg: messages_1.default.SUCCESS.ADMIN.ADMIN_UPDATED,
                                data: adminObj,
                            })];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _b.sent();
                        logger_1.default.error(error_3);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
    deletarAdmin: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, admin, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!req.params.id || isNaN(parseInt(req.params.id))) {
                            logger_1.default.error(messages_1.default.ERROR.NOT_VALID_ID);
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ success: false, msg: messages_1.default.ERROR.NOT_VALID_ID })];
                        }
                        id = new mongoose_1.default.Types.ObjectId(req.params.id);
                        return [4 /*yield*/, AdminRepository_1.default.listarAdminId(id, Admin_1.Admin)];
                    case 1:
                        admin = _a.sent();
                        if (!!admin) return [3 /*break*/, 2];
                        logger_1.default.error(messages_1.default.ERROR.ADMIN.ADMIN_NOT_FOUND);
                        return [2 /*return*/, res.status(404).json({
                                success: false,
                                msg: messages_1.default.ERROR.ADMIN.ADMIN_NOT_FOUND,
                            })];
                    case 2: return [4 /*yield*/, AdminRepository_1.default.deletarAdmin(id)];
                    case 3:
                        _a.sent();
                        logger_1.default.info(messages_1.default.SUCCESS.ADMIN.ADMIN_DELETED);
                        return [2 /*return*/, res.sendStatus(204)];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        logger_1.default.error(error_4);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ success: false, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = AdminController;
