import { validate, Joi } from "express-validation";

const validateCreateCliente = validate({
  body: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    telefone: Joi.string().required(),
    aniversario: Joi.string(),
    sexo: Joi.string().optional(),
  }),
});

export default validateCreateCliente;
