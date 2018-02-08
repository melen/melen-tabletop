'use strict'

const express = require('express');
const app = express();

let port = 3000;

// Handles User level data
let UserController = require('./controllers/UserController');
app.use('/user/', UserController);

// Handles information related to games and sessions
let GameController = require('./controllers/GameController');
app.use('/game/', GameController);

// Handles NPCs and Player Characters
let CharacterController = require('./controllers/CharacterController');
app.use('/character/', CharacterController);

app.listen(port, function () {
    console.log("Currently running on port "+port);
});

module.exports = {
    app: app
};