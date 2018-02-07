const uuid = require("uuid4");
let db = require('../db');

class Game {
    createUser(data) {
        let params = {
            "id": {S: uuid()},
            "name": {S: data.name}
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
}

module.exports = Game;