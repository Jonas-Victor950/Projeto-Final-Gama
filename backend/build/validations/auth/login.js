"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validation_1 = require("express-validation");
var validateClienteLogin = (0, express_validation_1.validate)({
    body: express_validation_1.Joi.object({
        email: express_validation_1.Joi.string().email().required(),
        senha: express_validation_1.Joi.string().required(),
    }),
});
exports.default = validateClienteLogin;
