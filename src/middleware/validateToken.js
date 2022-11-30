const { verify } = require('jsonwebtoken');
const { CustomError } = require('../helpers');
const { ValidateTokenService } = require('../services');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError('Authorization header not provided.', 400, 'Provide token');
    }

    if (!req.headers.authorization.startsWith('Bearer')) {
      throw new CustomError('Invalid token type.', 400, 'Provide valid token');
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedData = verify(token, process.env.JWT_SECRET_KEY);

    const isValidToken = await ValidateTokenService.validateToken(decodedData.id, token);
    if (!isValidToken) {
      throw new CustomError('Invalid token.', 400, 'Provide valid token');
    }

    req.user = decodedData;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      next(error);
    }
    next(new CustomError('Unable to validate token', 500, `${error.message}`));
  }
};
