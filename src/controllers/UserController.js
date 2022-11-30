const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');
const { UserService } = require('../services');
const { CustomError } = require('../helpers');
const { config } = require('../config');

class UserController {
  getUserData = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await UserService.getUserData(id);

    res.status(200).json({ code: 200, status: 'success', user });
  });

  updateUserData = asyncHandler(async (req, res) => {
    const { id } = req.user;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ code: 400, status: 'failed', message: 'Provide data to update.' });
    }
    if (req.body.password) {
      return res.status(400).json({ code: 400, status: 'failed', message: 'Password is protected field.' });
    }
    const user = await UserService.updateUserData(id, req.body);

    res.status(200).json({ code: 200, status: 'success', user });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new CustomError('File is required.', 400, 'Upload file.');
    }
    const { path } = req.file;
    const { id } = req.user;

    try {
      const upload = await config.cloudUploads(path, 'avatars');
      const avatarUrl = upload.url;
      const user = await UserService.updateAvatar(id, avatarUrl);
      await fs.unlink(path);

      res.status(200).json({ code: 200, status: 'success', user });
    } catch (error) {
      await fs.unlink(path);
      throw new CustomError('Unable to update avatar', 500, `${error.message}`);
    }
  });

  addUserPet = asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new CustomError('Missing required fields.', 400, 'Provide necessary data.');
    }
    const { path } = req.file;
    const owner = req.user;
    const { name, dateOfBirth, breed, comments } = req.body;

    if (!name || !dateOfBirth || !breed || !comments) {
      await fs.unlink(path);
      throw new CustomError('Missing required fields.', 400, 'Provide necessary data.');
    }
    try {
      const upload = await config.cloudUploads(path, 'petImages');
      const petImageUrl = upload.url;
      const pet = await UserService.addUserPet(owner, req.body, petImageUrl);
      await fs.unlink(path);

      res.status(201).json({ code: 201, status: 'success', pet });
    } catch (error) {
      await fs.unlink(path);
      throw new CustomError('Unable to update avatar', 500, `${error.message}`);
    }
  });

  deleteUserPet = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await UserService.deleteUserPet(id);

    res.status(200).json({ code: 200, status: 'success', message: 'Pet was deleted' });
  });

  updateUserPetData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ code: 400, status: 'failed', message: 'Provide data to update.' });
    }
    const pet = await UserService.updateUserPetData(id, req.body);

    res.status(200).json({ code: 200, status: 'success', pet });
  });

  updateUserPetImage = asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new CustomError('File is required.', 400, 'Upload file.');
    }
    const { path } = req.file;
    const { id } = req.params;
    try {
      const upload = await config.cloudUploads(path, 'petImages');
      const petImageUrl = upload.url;
      const pet = await UserService.updateUserPetImage(id, petImageUrl);
      await fs.unlink(path);

      res.status(200).json({ code: 200, status: 'success', pet });
    } catch (error) {
      await fs.unlink(path);
      throw new CustomError('Unable to update pet image.', 500, `${error.message}`);
    }
  });

  getUserPets = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const pets = await UserService.getUserPets(id);

    res.status(200).json({ code: 200, status: 'success', pets });
  });

  addNoticeToFavorites = asyncHandler(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    await UserService.addNoticeToFavorites(userId, noticeId);

    res.status(200).json({ code: 200, status: 'success', message: 'Notice was added to Favorite.' });
  });

  getUserFavorites = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const favorites = await UserService.getUserFavorites(id);

    res.status(200).json({ code: 200, status: 'success', favorites });
  });

  deleteNoticeFromFavorites = asyncHandler(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    await UserService.deleteNoticeFromFavorites(userId, noticeId);

    res.status(200).json({ code: 200, status: 'success', message: 'Notice was deleted from Favorite.' });
  });

  getUserNotices = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const notices = await UserService.getUserNotices(id);

    res.status(200).json({ code: 200, status: 'success', notices });
  });

  deleteUserNotice = asyncHandler(async (req, res) => {
    const { id: noticeId } = req.params;
    const { id: userId } = req.user;
    await UserService.deleteUserNotice(userId, noticeId);

    res.status(200).json({ code: 200, status: 'success', message: 'Notice was deleted.' });
  });
}

module.exports = new UserController();
