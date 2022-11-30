const Joi = require('joi');

const recoverPasswordSchema = Joi.object({
  id: Joi.string(),
  password: Joi.string().pattern(/^\S+$/).min(7).max(32)
});

module.exports = recoverPasswordSchema;
