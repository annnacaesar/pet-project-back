const { CustomError } = require('../helpers');
const fs = require('fs/promises');
const path = require('path');

const sponsorsPath = path.resolve('src/models/sponsors.json');


class SponsorService {
  
  getAllSponsors = async () => {
    const data = await fs.readFile(sponsorsPath);
    if (!data) {
      throw new CustomError('Unable to get sponsors');
    }
    const result = JSON.parse(data);
    if (!result) {
      throw new CustomError('Unable to parse data');
    }
    
    return result;
  }
  
}


module.exports = new SponsorService();