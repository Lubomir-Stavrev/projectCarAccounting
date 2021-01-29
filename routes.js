const { Router } = require('express');

const pageController = require('./controllers/pageController');

const router = Router();

router.use(pageController);

module.exports = router;