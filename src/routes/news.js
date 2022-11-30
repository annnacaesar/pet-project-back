const { Router } = require('express');
const { NewsController } = require('../controllers');

const router = Router();

router.get('/', NewsController.getAllNews);

module.exports = router;
