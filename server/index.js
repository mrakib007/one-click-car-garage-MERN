const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
    const usersCollection = client
      .db("oneClickCarSolution")
      .collection("users");

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
  } finally {
  }
}
run().catch(console.log);
app.get("/", async (req, res) => {
  res.send("One Click Car Solution Server Running");
});
app.listen(port, () => console.log("Server Running"));
