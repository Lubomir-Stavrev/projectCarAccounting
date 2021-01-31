const { Router } = require('express');
const router = Router();
const pageService = require('../services/pageService');

router.get('/', (req, res) => {
    pageService.getAll().then(result => {

        console.log(result);
    })
    res.render('home', { title: 'Home' });
})

router.get('/create', (req, res) => {

    res.render('create', { title: 'Create' });
})

router.post('/create', (req, res) => {
    console.log(req.body);
    pageService.create(req.body);
    res.redirect('/');

})

module.exports = router;