const { Router } = require('express');
const router = Router();
const carsService = require('../services/carsService');


router.get('/create', (req, res) => {

    res.render('create', { title: 'Create' });
})

router.post('/create', (req, res) => {

    carsService.create(req.body).then(car => {
        res.redirect('/');

    }).catch(err => {

        res.render('create', { error: err });
        console.log("An error hes accured :=>\n", err);
    });

})

router.get('/details/:id', async(req, res) => {

    let car = await carsService.getOne(req.params.id);
    res.render('details', { title: 'details', car })
})

router.get('/delete(/:id)?', async(req, res) => {
    await carsService.deleteCar(req.params.id)
    res.redirect('/')
})

module.exports = router;