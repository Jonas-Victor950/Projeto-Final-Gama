import { validate, Joi } from "express-validation";

const validateCreateProfissional = validate({
    body:Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        senha: Joi.string().required(),
        telefone: Joi.string().required(),
        sexo: Joi.string().required()
    }),
});

export default validateCreateProfissional;