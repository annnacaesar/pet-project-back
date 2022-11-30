const { SponsorService } = require('../services');

class SponsorController {
  getAllSponsors = async (_, res) => {
    const result = await SponsorService.getAllSponsors();

    res.status(200).json(result);
  };
}

module.exports = new SponsorController();
