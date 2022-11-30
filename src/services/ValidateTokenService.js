const { UserModel } = require('../models');

class ValidateTokenService {
  validateToken = async (id, token) => {
    const user = await UserModel.findById(id);
    if (user && user.token === token) {
      return true;
    }
    return false;
  };
}

module.exports = new ValidateTokenService();
