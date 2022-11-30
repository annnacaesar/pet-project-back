const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');
const { config } = require('../config');
const { UserModel } = require('../models');
const { CustomError } = require('../helpers');
const { UserDto } = require('../dtos');
const MailService = require('./MailService');

class AuthService {
  register = async (body) => {
    const user = await UserModel.findOne({ email: body.email });
    if (user) {
      throw new CustomError(`User with email: ${body.email} already exist.`, 400, 'Please login.');
    }

    const hashPassword = this.hashPassword(body.password);
    if (!hashPassword) {
      throw new CustomError('Unable to hash password.');
    }

    const newUser = await UserModel.create({ ...body, password: hashPassword });
    if (!newUser) {
      throw new CustomError('Unable to save User to DB.');
    }

    const userDto = new UserDto(newUser); // id, email, phone
    const token = this.generateToken({ ...userDto });

    newUser.token = token;
    await newUser.save();

    newUser.password = '';
    return newUser;
  };

  login = async (email, password) => {
    const user = await UserModel.findOne({ email }).populate('pets');

    if (!user) {
      throw new CustomError(`User with email: ${email} not found.`, 400, 'Please provide valid email.');
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new CustomError('Invalid password', 400, 'Please provide valid password.');
    }

    const userDto = new UserDto(user); // id, email, phone
    const token = this.generateToken({ ...userDto });

    user.token = token;
    await user.save();

    if (!user.token) {
      throw new CustomError('Unable to save token.');
    }

    user.password = '';
    return user;
  };

  logout = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new CustomError(`Unable to logout.`, 400, 'Please try again.');
    }

    user.token = null;
    await user.save();

    if (user.token) {
      throw new CustomError(`Unable to update token in DB.`);
    }

    return true;
  };

  forgotPassword = async (email) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new CustomError(`Unable to find user with email: ${email}.`, 400, 'Please check the name of your email.');
    }
    await MailService.sendChangePasswordMail(email, user._id);
  };

  recoverPassword = async (id, password) => {
    const hashPassword = this.hashPassword(password);

    const user = await UserModel.findByIdAndUpdate(id, { password: hashPassword });
    if (!user) {
      throw new CustomError(`Unable to update user details.`, 400, 'Try again later');
    }
  };

  hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, 10);
    return hashPassword;
  };

  generateToken = (payload) => {
    return Jwt.sign(payload, config.token.secret, { expiresIn: '24h' });
  };
}

module.exports = new AuthService();
