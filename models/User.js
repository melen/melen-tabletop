const uuid = require("uuid4");
let db = require('../db');

class User {
    createUser(data) {
        let params = {
            "id": {S: uuid()},
            "name": {S: data.name}
        };
        return db.putItem({
            TableName: "Users",
            Item: params
        }, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(params, null, 2));
            }
        })
    }

    getUser(data) {

    }

    updateUser(data) {

    }

    deleteUser() {

    }
}

module.exports = User;