const { UserModel, PetModel, NoticeModel } = require('../models');
const { CustomError } = require('../helpers');

class UserService {
  getUserData = async (id) => {
    const user = await UserModel.findById(id, { password: 0 }).populate('pets');
    if (!user) {
      throw new CustomError('Unable to find User.');
    }

    return user;
  };

  updateUserData = async (id, body) => {
    const user = await UserModel.findByIdAndUpdate(id, { ...body }, { new: true });
    if (!user) {
      throw new CustomError('Unable to update User data.');
    }
    return user;
  };

  updateAvatar = async (id, avatarUrl) => {
    const user = await UserModel.findByIdAndUpdate(id, { avatar: avatarUrl }, { projection: { avatar: 1, name: 1 }, new: true });
    if (!user) {
      throw new CustomError('Unable to update User avatar.');
    }
    return user;
  };

  addUserPet = async (owner, data, petImage) => {
    const { name, dateOfBirth, breed } = data;
    const pet = await PetModel.findOne({ name, dateOfBirth, breed });

    if (pet) {
      throw new CustomError(`Pet already exist.`, 400, 'Please check your posts.');
    }

    const newPet = await PetModel.create({ ...data, owner, petImage });
    if (!newPet) {
      throw new CustomError('Unable to create new Pet data.');
    }

    await UserModel.updateOne({ _id: owner.id }, { $push: { pets: newPet._id } });

    return newPet;
  };

  deleteUserPet = async (id) => {
    const deletedPet = await PetModel.findByIdAndRemove(id);
    if (!deletedPet) {
      throw new CustomError('Unable to delete Pet.');
    }

    await UserModel.updateOne({ _id: deletedPet.owner.id }, { $pull: { pets: { $in: [deletedPet._id] } } });

    return deletedPet;
  };

  updateUserPetData = async (id, data) => {
    const pet = await PetModel.findByIdAndUpdate(id, { ...data }, { new: true });
    if (!pet) {
      throw new CustomError('Unable to update Pet data.');
    }
    return pet;
  };

  updateUserPetImage = async (id, petImgUrl) => {
    const pet = await PetModel.findByIdAndUpdate(id, { petImage: petImgUrl }, { new: true });
    if (!pet) {
      throw new CustomError('Unable to update Pet image.');
    }
    return pet;
  };

  getUserPets = async (id) => {
    const user = await UserModel.findById(id).populate('pets');
    if (!user) {
      throw new CustomError('Unable to get user pets from DB.');
    }
    return user.pets;
  };

  addNoticeToFavorites = async (userId, noticeId) => {
    const user = await UserModel.updateOne({ _id: userId }, { $push: { favorites: noticeId } });
    if (!user) {
      throw new CustomError('Unable to add Notice to favorites.');
    }

    return true;
  };

  getUserFavorites = async (id) => {
    const user = await UserModel.findById(id).populate('favorites');
    if (!user) {
      throw new CustomError('Unable to get favorites.');
    }

    return user.favorites;
  };

  deleteNoticeFromFavorites = async (userId, noticeId) => {
    const user = await UserModel.updateOne({ _id: userId }, { $pull: { favorites: noticeId } });
    if (!user) {
      throw new CustomError('Unable to delete Notice from favorites.');
    }

    return true;
  };

  getUserNotices = async (id) => {
    const user = await UserModel.findById(id).populate('notices');
    if (!user) {
      throw new CustomError('Unable to get Notices.');
    }

    return user.notices;
  };

  deleteUserNotice = async (userId, noticeId) => {
    const deletedNotice = await NoticeModel.findOneAndDelete({ _id: noticeId });
    if (!deletedNotice) {
      throw new CustomError('Unable to delete Notice from DB.');
    }

    const user = await UserModel.updateOne({ _id: userId }, { $pull: { notices: noticeId } });
    if (!user) {
      throw new CustomError('Unable to delete Notice from user notices.');
    }

    return deletedNotice;
  };
}

module.exports = new UserService();
