let express = require('express');
let router = express.Router();
let Game = require('../models/Game');
let auth = require('../auth/auth');

let gameModel = new Game();

router.get('/create', (req, res) => {
    gameModel .createGame({
        name: "Test User"
    }).on('success', function (response) {
        res.send("Created")
    }).on('error', function (response) {
        res.status(400).send(JSON.stringify(response, null, 2))
    });
});

router.get('/:id', auth.jwt, auth.validateGame, (req, res) => {
    gameModel.getGame()
});

router.put('/:id', auth.jwt, (req, res) => {
    gameModel.updateGame()
});

router.delete('/:id', auth.jwt, (req, res) => {
    gameModel.deleteGame()
});

module.exports = router;