const jwt = require('express-jwt');
const config = require('../config/config');
const Game = require('../models/Game');
const User = require('../models/User');

let gameModel = new Game();
let userModel = new User();

let auth = jwt({secret: config.jwt_secret});

let validateUser = function (req, res, next) {
    if (req.user.id !== req.param.id){
        res.status(401).send({
            type: "invalid_user",
            message: "Unauthorized request"
        });
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
            message: "No game owner"
        });
    }
    next();
};

let validateLogin = function (body) {
    return body['pwd'] === userModel.getUser({id: body.id})['pwd'];
};

module.exports = {
    jwt: auth,
    validateUser: validateUser(),
    validateGame: validateGame(),
    validateLogin: validateLogin()
};