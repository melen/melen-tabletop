let express = require('express');
let router = express.Router();
let Game = require('../models/Game');
let auth = require('../auth/auth');

let gameModel = new Game();

let gameStates = {};

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

router.post('/roll', (req, res) => {
    let results = {};
    for (let dice in req.body) {
        if (req.body.hasOwnProperty(dice)) {
            results[dice] = [];
            for (let i in req.body[dice]) {
                results[dice].push(Math.floor(Math.random() * Math.floor(dice))+1)
            }
        }
    }
    res.send(results)
});

router.post('/join/:id', auth.jwt, auth.validateGame, (req, res) => {
    if (gameStates.hasOwnProperty(req.params.id)) {
        gameStates[req.params.id].players++;
        gameStates[req.params.id][req.body.uid] = {
            updated: false
        };
    } else {
        gameStates[req.params.id] = {
            active: true,
            players: 1
        };
        gameStates[req.params.id][req.body.uid] = {
            updated: false
        };

    }
    res.status(200).send({
        message: 'success'
    });
});

module.exports = router;