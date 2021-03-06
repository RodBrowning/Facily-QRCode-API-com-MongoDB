// const dotenv = require('dotenv')
// dotenv.config()

// const mongodb_connection = require('./mongobd_con')
const { MongoClient, ServerApiVersion } = require('mongodb');
const DATABASE_USER = "codigos";
const DATABASE_PASSWORD = "codigos";
const DATABASE_NAME = "qrcodes";
const URL = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@qrcodes.5p5a9.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const mongodb_connection = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  var statusCode = 200;
  var response = '';
  
  return mongodb_connection.connect(async (err) => {
    const collection = await mongodb_connection.db("qrcodes").collection("qrcodes");
    
    try {      
      const findResult = await collection.find({}).toArray();
      response = findResult;
      
    } catch (error) {
      statusCode = 400;
      response = error;
    }
    mongodb_connection.close();
    return res.type('json').status(statusCode).send(response);
  });
});
app.get('/:codigo', function (req, res) {
  var {codigo} = req.params;
  var statusCode = 200;
  var response = '';
  
  
  return mongodb_connection.connect(async (err) => {
    const collection = await mongodb_connection.db("qrcodes").collection("qrcodes");
    
    try {      
      const findResult = await collection.find({codigo: codigo}).toArray();
      response = findResult;
      
    } catch (error) {
      statusCode = 400;
      response = error;
    }
    mongodb_connection.close();
    return res.type('json').status(statusCode).send(response);
  });
});
app.post('/', function (req, res) {
  const { codigo } = req.body;
  var statusCode =  0;
  var response = '';
  
  return mongodb_connection.connect(async (err) => {
    const collection = await mongodb_connection.db("qrcodes").collection("qrcodes");
    
    try {      
      const exist = await collection.find({codigo: codigo}).toArray();
      if(exist.length === 0) {
        const findResult = await collection.insertOne({codigo: codigo});
        response = findResult;
        statusCode =  200;
      } else {
        response = "Codigo j?? registrado";
        statusCode = 400;
      }
      
    } catch (error) {
      response = error;
      statusCode = 400;
    }
    mongodb_connection.close();
    return res.type('json').status(statusCode).send(response);
  });
});
app.delete('/:codigo', function (req, res) {
  var {codigo} = req.params;
  var statusCode = 200;
  var response = '';
  
  
  return mongodb_connection.connect(async (err) => {
    const collection = mongodb_connection.db("qrcodes").collection("qrcodes");
    
    try {      
      const findResult = await collection.deleteMany({codigo: codigo});
      response = findResult;
      
    } catch (error) {
      statusCode = 400;
      response = error;
    }
    mongodb_connection.close();
    response.affectedRows = response.deletedCount;
    return res.type('json').status(statusCode).send(response);
  });
});

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running...", process.env.PORT || 3000));