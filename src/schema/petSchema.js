const Joi = require('joi');
const dateOfBirthRegExp =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

const petSchema = Joi.object({
  title: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(2)
    .max(48),
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(2)
    .max(16),
  dateOfBirth: Joi.string().pattern(dateOfBirthRegExp),
  breed: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(2)
    .max(24),
  sex: Joi.string().valid('male', 'female'),
  location: Joi.string()
    .pattern(/^[a-zA-Z]+,?\s[a-zA-Z]+$/)
    .min(2)
    .max(24),
  price: Joi.string()
    .pattern(/^[1-9][0-9]+$/)
    .min(1)
    .max(6),
  comments: Joi.string().min(8).max(120),
  sex: Joi.string().allow('Male', 'Female'),
  category: Joi.string().valid('lost-found', 'inGoodHands', 'sell'),
  petImage: Joi.string()
});

module.exports = petSchema;
