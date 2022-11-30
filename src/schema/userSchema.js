const Joi = require('joi');
const birthdayRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const userSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(3),
  email: Joi.string().email(),
  password: Joi.string().pattern(/^\S+$/).min(7).max(32),
  city: Joi.string(),
  phone: Joi.string().pattern(/^\+380\d{9}$/),
  birthday: Joi.string().pattern(birthdayRegExp),
  avatar: Joi.string()
});

module.exports = userSchema;
