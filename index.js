const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is Running.');
});

app.listen(port, () => {
    console.log('Listing Port: ', port);
});
