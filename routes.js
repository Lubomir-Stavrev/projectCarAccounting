const { Router } = require('express');

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const carsController = require('./controllers/carsController');

const router = Router();

router.use('/', homeController);
router.use('/auth', authController);
router.use('/cars', carsController);

module.exports = router;