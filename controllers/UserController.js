let express = require('express');
let router = express.Router();
let User = require('../models/User');
let auth = require('../auth/auth');
let jwt = require('jsonwebtoken');
const config = require('../config/config');

let userModel = new User();

router.get('/', (req, res) =>{
    res.send('hello')
});

router.post('/create', (req, res) => {
    userModel.createUser({
        name: "Test User"
    }).on('success', function (response) {
        res.send("Created")
    }).on('error', function (response) {
        res.status(400).send(JSON.stringify(response, null, 2))
    });
});

router.post('/login', (req, res) => {
    if (auth.validateLogin(req.body)) {
        res.send(jwt.sign({
            id: req.body.id
        }, config.jwt_secret, { expiresIn: '24h'}));
    } else {
        res.status(403).send({error: "Invalid username or password"});
    }
});

router.get('/:id', auth.jwt, auth.validateUser, (req, res) => {
    userModel.getUser()
});

router.put('/:id', auth.jwt, auth.validateUser, (req, res) => {
    userModel.updateUser()
});

router.delete('/:id', auth.jwt, auth.validateUser, (req, res) => {
    userModel.deleteUser()
});


module.exports = router;