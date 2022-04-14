
const { MongoClient, ServerApiVersion } = require('mongodb');
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@qrcodes.5p5a9.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;
