import { validate, Joi } from "express-validation";

const validateCreateServico = validate({
  body: Joi.object({
    servico: Joi.string().required(),
    preco: Joi.string().required(),
    duracao: Joi.string().required(),
  }),
});

export default validateCreateServico;
