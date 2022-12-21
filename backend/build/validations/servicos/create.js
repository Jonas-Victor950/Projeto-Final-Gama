"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validation_1 = require("express-validation");
var validateCreateServico = (0, express_validation_1.validate)({
    body: express_validation_1.Joi.object({
        servico: express_validation_1.Joi.string().required(),
        preco: express_validation_1.Joi.string().required(),
        duracao: express_validation_1.Joi.string().required(),
    }),
});
exports.default = validateCreateServico;
