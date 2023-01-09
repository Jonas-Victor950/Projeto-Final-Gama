import { validate, Joi } from "express-validation";

const validateClienteLogin = validate({
  body: Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
  }),
});

export default validateClienteLogin;
