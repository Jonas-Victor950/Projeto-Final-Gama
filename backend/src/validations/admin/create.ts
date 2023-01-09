import { validate, Joi } from "express-validation";

const validateCreateAdmin = validate({
  body: Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
  }),
});

export default validateCreateAdmin;
