const { NewsService } = require('../services');

class NewsController {
  getAllNews = async (req, res) => {
    const result = await NewsService.getAllNews();

    res.status(200).json(result);
  };
}

module.exports = new NewsController();
