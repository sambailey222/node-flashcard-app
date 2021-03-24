const express = require('express');
const router = express.Router();

router.get('/', (req, response) => {
    const name = req.cookies.username;
    if (name) {
    response.render('index', { name: name })
    } else {
        response.redirect('/hello');
    }
});

// router.get('/cards', (request, response) => {
//     response.render('card', { prompt: "Who is buried in Grant's Tomb?" });
// });
// /sandbox
// First Name, Last Name
// router.get('/sandbox', (req, res) => {
//     res.render('sandbox', { colors });
// });

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        response.redirect('/');
    } else {
        res.render('hello');
    }
    
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
}
)

module.exports = router;