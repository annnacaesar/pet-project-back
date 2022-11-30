const { isValidObjectId } = require('mongoose');
const { CustomError } = require('../helpers');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);
  if (!result) {
    next(new CustomError(`${id} is not valid id`, 400));
  }
  next();
};

module.exports = isValidId;
