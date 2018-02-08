const uuid = require("uuid4");
let db = require('../db');

class Game {
    createGame(data) {
        let params = {
            "id": {S: uuid()},
            "players": {L: [
                    {
                        M: {
                            id: {S: uuid()},
                            name: {S: "name here"},
                        }
                    },
                    {
                        M: {
                            id: {S: uuid()},
                            name: {S: "name here"},
                        }
                    },
                    {
                        M: {
                            id: {S: uuid()},
                            name: {S: "name here"},
                        }
                    },
                    {
                        M: {
                            id: {S: uuid()},
                            name: {S: "name here"},
                        }
                    }
                ]},
            "dm": {S: uuid()}
        };
        return db.putItem({
            TableName: "Games",
            Item: params
        }, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(params, null, 2));
            }
        })
    }
    getGame(data) {

    }

    updateGame(data) {

    }

    deleteGame() {

    }
}

module.exports = Game;