const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zndhpn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const usersCollection = client.db('oneClickCarSolution').collection('users');

    app.post('/users',async (req,res)=>{
        const user = req.body;
        const filter = {email: user?.email};
        const oldUser = await usersCollection.findOne(filter);
        if(!oldUser){
            const result = await usersCollection.insertOne(user);
            res.send(result);
        }else{
            res.status(400).json({message: 'User already exists'});
        }
    });

}
    finally{
    }
}
run().catch(console.log)
app.get('/',async(req,res)=>{
    res.send('One Click Car Solution Server Running');
})
app.listen(port,()=>console.log('Server Running'));