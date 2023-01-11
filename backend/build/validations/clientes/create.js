"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validation_1 = require("express-validation");
var validateCreateCliente = (0, express_validation_1.validate)({
    body: express_validation_1.Joi.object({
        nome: express_validation_1.Joi.string().required(),
        email: express_validation_1.Joi.string().email().required(),
        senha: express_validation_1.Joi.string().required(),
        telefone: express_validation_1.Joi.string().required(),
        aniversario: express_validation_1.Joi.string(),
        sexo: express_validation_1.Joi.string().optional(),
    }),
});
exports.default = validateCreateCliente;
