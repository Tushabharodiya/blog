let Joi = require("joi");

let blog = {
    body: Joi.object().keys({
        title: Joi.string().required().trim(),
        media: Joi.string(),
        description: Joi.string().required().trim(),
        public_id: Joi.string(),
    }),
};

module.exports = { blog };