const jwt = require('express-jwt');
const config = require('../config/config');
const Game = require('../models/Game');

let gameModel = new Game();

let auth = jwt({secret: config.jwt_secret});

let validateUser = function (req, res, next) {
    if (req.user.id !== req.param.id){
        res.status(401).send("Unauthorized request");
    }
    next();
};

let validateGame = function (req, res, next) {
    let game = gameModel.getGame({
        id: req.param.id
    });
    if (req.user.id !== game.dm){
        res.status(401).send({
            type: "not_owner",
            message
        });
    }
    next();
};

module.exports = {
    jwt: auth,
    validate: validateUser(),
    validateRes: validateGame()
};