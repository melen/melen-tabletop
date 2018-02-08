let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let User = require('../models/User');
let auth = require('../auth/auth');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let userModel = new User();

router.post('/create', (req, res) => {
    userModel.createUser({
        name: "Test User"
    }).on('success', function (response) {
        res.send("Created")
    }).on('error', function (response) {
        res.send(JSON.stringify(response, null, 2))
    });
});

router.get('/:id', auth.jwt, auth.validate, (req, res) => {
    userModel.getUser()
});

router.put('/:id', auth.jwt, auth.validate, (req, res) => {
    userModel.updateUser()
});

router.delete('/:id', auth.jwt, auth.validate, (req, res) => {
    userModel.deleteUser()
});


module.exports = router;