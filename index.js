const express = require('express')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 5000;

// console.log(process.env.DB_USER);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqa8e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


// const Server = require('mongodb').Server;

// const mongoClient = new MongoClient(new Server('localhost', 5000));

// mongoClient.open(function(err, mongoClient) {

//   const db1 = mongoClient.db("emaJohnStore");

//   // mongoClient.close();
// });


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("emaJohnStore").collection("products");
  
  app.post('/addProduct', (req, res) => {
    const products = req.body;
    // console.log(product);
    productsCollection.insertMany(products)
    .then(result => {
      // console.log(result);
      console.log(result.insertedCount);
      res.send(result.insertedCount)
    })
  })
});
// 

app.listen(port)