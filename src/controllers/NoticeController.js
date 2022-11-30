const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');
const { NoticeService } = require('../services');
const { CustomError } = require('../helpers');
const { config } = require('../config');

class NoticeController {
  addNoticeToCategory = asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new CustomError('Missing required fields.', 400, 'Provide necessary data.');
    }
    const { path } = req.file;
    const owner = req.user;
    const { title, sex, location, category } = req.body;

    if (!title || !sex || !location || !category) {
      await fs.unlink(path);
      throw new CustomError('Missing required fields.', 400, 'Provide necessary data.');
    }
    try {
      const upload = await config.cloudUploads(path, 'noticeImages');
      const noticeImageUrl = upload.url;
      const notice = await NoticeService.addNoticeToCategory(owner, req.body, noticeImageUrl);
      await fs.unlink(path);

      res.status(201).json({ code: 201, status: 'created', notice });
    } catch (error) {
      await fs.unlink(path);
      throw new CustomError('Unable to update avatar', 500, `${error.message}`);
    }
  });

  getNoticesByCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.params;
    let { search, page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * limit;
    limit = parseInt(limit) > 20 ? 20 : limit;

    const data = await NoticeService.getNoticesByCategory(categoryName, search, skip, limit);

    res.status(200).json({ code: 200, status: 'success', data, page, limit, total: data.length });
  });

  getNoticeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notice = await NoticeService.getNoticeById(id);
    res.status(200).json({ code: 200, status: 'success', notice });
  });

  searchByNameInTitle = asyncHandler(async (req, res) => {
    const { name } = req.params;
    const notices = await NoticeService.searchByNameInTitle(name);
    res.status(200).json({ code: 200, status: 'success', notices });
  });
}

module.exports = new NoticeController();
