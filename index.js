const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

const brandCollection = client.db('techHubDB').collection('brandCollection');
const categoryCollection = client.db('techHubDB').collection('categoryCollection');
const productCollection = client.db('techHubDB').collection('productCollection');

app.get('/', (req, res) => {
    res.send('Server is Running.');
});
app.get('/brands', async(req, res)=>{
    const cursor = brandCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})
app.get('/brand/:name', async(req, res)=>{
    const name = req.params.name
    const query = {
        brand: name
    }
    const cursor = productCollection.find(query)
    const result = await cursor.toArray()
    res.send(result)
})
app.get('/categories', async(req, res)=>{
    const cursor = categoryCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})
app.get('/category/:name', async(req, res)=>{
    const name = req.params.name
    const query = {
        category: name
    }
    const cursor = productCollection.find(query)
    const result = await cursor.toArray()
    res.send(result)
})

app.get('/products', async(req, res)=>{
    const cursor = productCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})
app.get('/product/:id', async(req, res)=>{
    const id = req.params.id
    const query = {
        _id: new ObjectId(id)
    }
    const result = await productCollection.findOne(query)
    res.send(result)
})
app.post('/add-brand', async(req, res)=>{
    const newBrand = req.body
    const result = await brandCollection.insertOne(newBrand)
    res.send(result)
})
app.post('/add-category', async(req, res)=>{
    const newCategory = req.body
    const result = await categoryCollection.insertOne(newCategory)
    res.send(result)
})
app.post('/add-product', async(req, res)=>{
    const newProduct = req.body
    const result = await productCollection.insertOne(newProduct)
    res.send(result)
})
app.delete('/delete-product/:id', async(req, res)=>{
    const id = req.params.id
    const query = {
        _id: new ObjectId(id)
    }
    const result = await productCollection.deleteOne(query)
    res.send(result)
})

app.put('/edit-product/:id', async(req, res)=>{
    const id = req.params.id
    const updatedProduct = req.body;
    
    const filter = {
        _id: new ObjectId(id)
    }
    const options = {
        upsert: true
    }
    const value = {
        $set: {
            name : updatedProduct.name,
            image : updatedProduct.image,
            shortdescription : updatedProduct.shortdescription,
            category: updatedProduct.category,
            brand: updatedProduct.brand,
            price: updatedProduct.price,
            rating: updatedProduct.rating,
        }
    }
    const result = await productCollection.updateOne(filter, value, options)
    res.send(result)
})

app.listen(port, () => {
    console.log('Listing Port: ', port);
});
