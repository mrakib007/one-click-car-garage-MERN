const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zndhpn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("unauthorized access");
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    console.log(token, process.env.ACCESS_TOKEN);
    if (err) {
      return res.status(403).send({ message: "Forbidden Access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    const usersCollection = client.db("oneClickCarSolution").collection("users");
    const serviceCollection = client.db("oneClickCarSolution").collection('services');   
    const addedServiceCollection = client.db("oneClickCarSolution").collection('addedServices');
    const paymentsCollection = client.db("oneClickCarSolution").collection('paymentsCollection');
    const bookingsCollection = client.db("oneClickCarSolution").collection('bookingsCollection');  

    const verifyAdmin = async (req, res, next) => {
      const decodedEmail = req.decoded.email;
      const query = { email: decodedEmail };
      const user = await usersCollection.findOne(query);

      if (user?.role !== "admin") {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    app.get('/jwt',async(req,res)=>{
      const email = req.query.email;
      const query = {email: email};
      const user = await usersCollection.findOne(query);
      if(user){
        const token = jwt.sign({email},process.env.ACCESS_TOKEN,{expiresIn: '1h'})
        return res.send({accessToken: token});
      }
      res.status(403).send({accessToken: ''})
    })

    app.post("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user?.email };
      const oldUser = await usersCollection.findOne(filter);
      if (!oldUser) {
        const result = await usersCollection.insertOne(user);
        res.send(result);
      } else {
        res.status(400).json({ message: "User already exists" });
      }
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });

    app.get('/users/admin/:email',async(req,res)=>{
      const email = req.params.email;
      const query = {email};
      const user = await usersCollection.findOne(query);
      res.send({isAdmin: user?.role === 'admin'});
    })

    app.put('/users/admin/:id',async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updatedDoc = {
        $set: {
          role: 'admin'
        }
      }
      const result = await usersCollection.updateOne(filter,updatedDoc,options);
      res.send(result);
    })

    app.post('/addService',async(req,res)=>{
      const services = req.body;
      const result = await addedServiceCollection.insertOne(services);
      res.send((result));
    })

    app.delete('/services/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await addedServiceCollection.deleteOne(query);
      res.send(result);
    })

    app.get('/myAddedServices',async(req,res)=>{
      try{ 
        let query = {};
        if(req.query.email){
          query = {
            email: req.query.email
          }
        }
        const cursor = addedServiceCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
      }
    })

    app.get('/services',async(req,res)=>{
      const query = {};
      const services = await serviceCollection.find(query).toArray();
      res.send(services);
    })

    app.get('/services/:id',async(req,res)=>{
      try{
        const id = req.params.id;
        const filterServices = await addedServiceCollection.find({id:id}).toArray();
        res.send(filterServices);
      }catch(error){
        res.status(500).json({message: 'Internal Server Error'});
      }
    })

    //Bookings related 
    app.post('/bookings',async(req,res)=>{
      const booking = req.body;
      const result = await bookingsCollection.insertOne(booking);
      res.send(result);
    })

    app.get('/bookings',async(req,res)=>{
      const email = req.query.email;
      // const decodedEmail = req.decoded.email;
      // if(email !== decodedEmail){
      //   return res.status(403).send({message: 'Forbidden Access'});
      // }
      const query = {email: email};
      const bookings = await bookingsCollection.find(query).toArray();
      res.send(bookings);
    })

    app.get('/bookings/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const booking = await bookingsCollection.findOne(query);
      res.send(booking);
    })
    
  } finally {
  }
}
run().catch(console.log);
app.get("/", async (req, res) => {
  res.send("One Click Car Solution Server Running");
});
app.listen(port, () => console.log("Server Running"));
