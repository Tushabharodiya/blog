let Joi = require("joi");

let user = {
    body: Joi.object().keys({
        name: Joi.string().required().trim(),
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        confirmpassword: Joi.string().required().trim(),
        role: Joi.string(),
    }),
};

module.exports = { user };