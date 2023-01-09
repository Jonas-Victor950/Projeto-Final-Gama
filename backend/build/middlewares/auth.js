"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = require("express-jwt");
var secret_1 = __importDefault(require("../configs/secret"));
exports.default = (0, express_jwt_1.expressjwt)({
    secret: secret_1.default.key,
    algorithms: ["HS256"],
});
