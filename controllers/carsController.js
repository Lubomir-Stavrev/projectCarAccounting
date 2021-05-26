const { Router } = require('express');
const router = Router();
const carsService = require('../services/carsService');
const authService = require('../services/authService');


router.get('/create', (req, res) => {

    res.render('create', { title: 'Create' });
})

router.post('/create', (req, res) => {

    let obj = req.body;
    Object.assign(obj, { ownerId: req.res.user._id })

    carsService.create(obj).then(car => {
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

    let car = await carsService.getOne(req.params.id);
    let isLiked = false;
    if (req.res.user) {
        isLiked = await authService.isLiked(req.res.user._id, req.params.id);
    }

    if (car.ownerId && req.res.user || isLiked) {
        car.isOwner = car.ownerId == req.res.user._id ? true : false;
        car.isLikedByThisUser = isLiked;
    }
    res.render('details', { title: 'details', car })
})


router.post('/edit/:id', (req, res) => {

    carsService.editCar(req.body, req.params.id)
        .then(editedCar => {

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

router.get('/like/:id', async(req, res) => {
    try {

        await carsService.likeCar(req.params.id, req.res.user._id)
        res.redirect(`/cars/details/${req.params.id}`)

    } catch (error) {
        console.log(error)
        res.redirect(`/cars/details/${req.params.id}`);
    }
})

module.exports = router;