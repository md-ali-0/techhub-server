const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.daanzm4.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const dbConnect= async() =>{
    try {
        await client.connect();
        console.log('Database Connected Subbcessfully');
    } catch (error) {
        console.log('Have an Erorr')
    }
}
dbConnect()

const techHubCollection = client.db('techHubDB').collection('techHubCollection');

app.get('/', (req, res) => {
    res.send('Server is Running.');
});

app.post('/add-brand', async(req, res)=>{
    const newBrand = req.body
    const result = await techHubCollection.insertOne(newBrand)
    res.send(result)
})

app.listen(port, () => {
    console.log('Listing Port: ', port);
});
