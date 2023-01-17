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
var Cliente_1 = require("../models/Cliente");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret_1 = __importDefault(require("../configs/secret"));
var logger_1 = __importDefault(require("../database/logger"));
var messages_1 = __importDefault(require("../constants/messages"));
var AuthController = {
    loginCliente: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, senha, cliente, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, senha = _a.senha;
                        return [4 /*yield*/, Cliente_1.Cliente.findOne({
                                email: email,
                            })];
                    case 1:
                        cliente = _b.sent();
                        if (!cliente) {
                            return [2 /*return*/, res.status(404).json(messages_1.default.ERROR.CLIENTES.CLIENTE_SENHA_EMAIL)];
                        }
                        if (!bcryptjs_1.default.compareSync(senha, cliente.senha)) {
                            return [2 /*return*/, res
                                    .status(401)
                                    .json(messages_1.default.ERROR.CLIENTES.CLIENTE_SENHA_EMAIL)];
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: cliente.id,
                            email: cliente.email,
                        }, secret_1.default.key, { expiresIn: "8h" });
                        return [2 /*return*/, res.status(200).json({
                                error: false,
                                message: messages_1.default.SUCCESS.CLIENTES.CLIENTE_LOGIN,
                                token: token,
                                cliente: cliente,
                            })];
                    case 2:
                        error_1 = _b.sent();
                        logger_1.default.error(error_1);
                        return [2 /*return*/, res
                                .status(500)
                                .json({ error: error_1, msg: messages_1.default.ERROR.ERROR_CATCH })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
exports.default = AuthController;
