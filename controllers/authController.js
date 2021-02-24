const { Router } = require('express');
const router = Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');



router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async(req, res) => {

    if (req.body.password != req.body.repeatPassword) {

        res.render('register', { error: { message: 'Passwords should be equal!' } })
        return;
    }

    authService.register(req.body)
        .then(acc => {
            res.redirect('/auth/login');
        }).catch(err => {
            res.render('register', { error: err });
        });
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    authService.login(req.body)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        }).catch(err => {
            console.log(err);
            res.render('login', { error: err });
        });
})

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;