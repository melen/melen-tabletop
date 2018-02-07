let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let User = require('../models/User');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let userModel = new User();

router.get('/', (req, res) => {
    res.send('Hello')
});

router.get('/create', (req, res) => {
    userModel.createUser({
        name: "Test User"
    }).on('success', function (response) {
        res.send("Created")
    }).on('error', function (response) {
        res.send(JSON.stringify(response, null, 2))
    });
});

module.exports = router;