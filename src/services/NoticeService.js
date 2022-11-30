const { NoticeModel, UserModel } = require('../models');
const { CustomError } = require('../helpers');

class NoticeService {
  addNoticeToCategory = async (owner, data, petImage) => {
    const { title, name, dateOfBirth, breed } = data;
    const notice = await NoticeModel.findOne({ title, name, dateOfBirth, breed });

    if (notice) {
      throw new CustomError(`Notice already exist.`, 400, 'Please check your posts.');
    }

    const newNotice = await NoticeModel.create({ ...data, owner, petImage });
    if (!newNotice) {
      throw new CustomError('Unable to create new Notice data.');
    }

    await UserModel.updateOne({ _id: owner.id }, { $push: { notices: newNotice._id } });
    return newNotice;
  };

  getNoticesByCategory = async (category, search, skip, limit) => {
    if (search) {
      const data = await NoticeModel.find(
        { category, $text: { $search: search, $caseSensitive: false } },
        { createdAt: 0, updatedAt: 0 },
        { skip, limit }
      );

      if (!data) {
        throw new CustomError('Unable to get data from DB.');
      }

      return data;
    }

    const data = await NoticeModel.find({ category }, { createdAt: 0, updatedAt: 0 }, { skip, limit });

    if (!data) {
      throw new CustomError('Unable to get data from DB.');
    }

    return data;
  };

  getNoticeById = async (id) => {
    const notice = await NoticeModel.findById(id, { createdAt: 0, updatedAt: 0 });

    if (!notice) {
      throw new CustomError(`Notice with id: ${id} not found.`, 400, 'Provide valid id.');
    }

    return notice;
  };

  searchByNameInTitle = async (name) => {
    const notices = await NoticeModel.find({ $text: { $search: name } });

    if (!notices) {
      throw new CustomError(`Notices with title ${searchName} not found.`, 400, 'Check your title name.');
    }

    return notices;
  };
}

module.exports = new NoticeService();
