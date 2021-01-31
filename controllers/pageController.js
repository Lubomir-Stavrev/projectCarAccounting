const { Router } = require('express');
const router = Router();
const pageService = require('../services/pageService');

router.get('/', (req, res) => {
    pageService.getAll().then(result => {

        res.render('home', { title: 'Home', cars: result });
        console.log(result);
    })
})

router.get('/create', (req, res) => {

    res.render('create', { title: 'Create' });
})

router.get('/details/:id', async(req, res) => {

    let car = await pageService.getOne(req.params.id);
    console.log(car);
    res.render('details', { title: 'details', car })

})

router.post('/create', (req, res) => {
    console.log(req.body);
    pageService.create(req.body);
    res.redirect('/');

})

module.exports = router;