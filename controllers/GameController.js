let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Game = require('../models/Game');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let gameModel = new Game();

router.get('/create', (req, res) => {
    gameModel .createGame({
        name: "Test User"
    }).on('success', function (response) {
        res.send("Created")
    }).on('error', function (response) {
        res.send(JSON.stringify(response, null, 2))
    });
});

router.get('/:id', auth.jwt, (req, res) => {
    gameModel.getUser()
});

router.put('/:id', auth.jwt, (req, res) => {
    gameModel.updateUser()
});

router.delete('/:id', auth.jwt, (req, res) => {
    gameModel.deleteUser()
});

module.exports = router;