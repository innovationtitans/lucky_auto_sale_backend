const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require("cors");
var jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@luckyautosales.pk6hsbz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const carCollection = client.db("LUCKYAUTOSALES_DB").collection("CARS_COLLECTION");



    /*************************************************************************
    ***************************All Gets Methods are here*********************/

    app.get("/cars", async (req, res)=>{
        const result = await carCollection.find().sort({date: -1}).toArray();
        res.send(result);

    })

    app.get("/carDetail/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await carCollection.find(query).toArray();
        res.send(result);
      });


      //Getting indiviual car detail for update

      app.get("/updateCar/:id", async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await carCollection.find(query).toArray();
        res.send(result);
      });

    



    //Post method for adding car to mongodb database;

    app.post("/addCar", async (req, res)=>{
        const body = req.body;
        const result = await carCollection.insertOne(body);
        res.send(result);
    })





    /****************Deleting Car**********************/


    app.delete("/deleteCar/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await carCollection.deleteOne(query);
      console.log(result);
      res.send(result);
    });





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
    res.send("Server is Running by Obi");
  });
  
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });