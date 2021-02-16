const { Router } = require('express');
const router = Router();
const pageService = require('../services/pageService');

router.get('/', (req, res) => {
    pageService.getAll().then(result => {

        res.render('home', { title: 'Home', cars: result });

    })
})

router.get('/create', (req, res) => {

    res.render('create', { title: 'Create' });
})

router.get('/details/:id', async(req, res) => {

    let car = await pageService.getOne(req.params.id);
    console.log(car.createdAt);
    res.render('details', { title: 'details', car })
})

router.get('/delete(/:id)?', async(req, res) => {
    await pageService.deleteCar(req.params.id)
    res.redirect('/')
})

router.post('/create', (req, res) => {

    pageService.create(req.body);
    res.redirect('/');

})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login')
})

module.exports = router;