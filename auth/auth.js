const jwt = require('express-jwt');
const config = require('../config/config');
const Game = require('../models/Game');
const User = require('../models/User');

let gameModel = new Game();
let userModel = new User();

module.exports.jwt = jwt({secret: config.jwt_secret});

module.exports.validateUser = (req, res, next) => {
    console.log(res);
    if (req.user.id !== req.param.id){
        res.status(401).send({
            type: "invalid_user",
            message: "Unauthorized request"
        });
    }
    next();
};

module.exports.validateGame = (req, res, next) => {
    console.log(req);
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

module.exports.validateLogin = (body) => {
    return body['pwd'] === userModel.getUser({id: body.id})['pwd'];
};

