const { Router } = require('express');
const router = Router();
const pageService = require('../services/carsService');


router.get('/', (req, res) => {
    pageService.getAll().then(result => {

        res.render('home', { title: 'Home', cars: result });

    })
})


module.exports = router;