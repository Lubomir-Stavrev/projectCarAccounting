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

router.get('/edit/:id', async(req, res) => {

    let car = await carsService.getOne(req.params.id);
    res.render('edit', car);
})


router.get('/details/:id', async(req, res) => {
    console.log('Here')
    let car = await carsService.getOne(req.params.id);
    res.render('details', { title: 'details', car })
})


router.post('/edit/:id', (req, res) => {

    carsService.editCar(req.body, req.params.id)
        .then(editedCar => {
            console.log(editedCar);
            res.redirect(302, `/cars/details/${req.params.id}`);
        }).catch(err => {
            res.status(err.status);
            res.render('edit', { error: err });

        })

})

router.get('/delete/:id', async(req, res) => {
    try {
        await carsService.deleteCar(req.params.id)
        res.redirect('/')

    } catch (error) {
        res.redirect(`details/${req.params.id}`);
    }
})

module.exports = router;