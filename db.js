const AWS = require('aws-sdk');
const config = require('./config/config');

AWS.config.apiVersions = {
    dynamodb: '2012-08-10'
};

let dynamo = new AWS.DynamoDB({
    region: 'us-east-1',
    access: config.access,
    secret: config.secret
});

module.exports = dynamo;