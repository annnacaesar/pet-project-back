const { CustomError } = require('../helpers');
const fs = require('fs/promises');
const path = require('path');

const newPath = path.resolve('src/models/news.json');

class NewsService {
  getAllNews = async () => {
    const data = await fs.readFile(newPath);
    if (!data) {
      throw new CustomError('Unable to get news');
    }
    const result = JSON.parse(data);
    if (!result) {
      throw new CustomError('Unable to parse data');
    }

    return result;
  };
}

module.exports = new NewsService();
