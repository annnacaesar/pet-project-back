const { CustomError } = require('../helpers');

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new CustomError(error.message, 400, 'Check provided data.');
    }
    next();
  };
};

module.exports = validateBody;
