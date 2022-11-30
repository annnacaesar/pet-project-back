const { Router } = require('express');
const { SponsorController } = require('../controllers');

const router = Router();

router.get('/', SponsorController.getAllSponsors);

module.exports = router;
