const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//middleware
app.use(express.json());
app.use(cors());

//routes
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route')
const storeRoute = require('./routes/strore.route');


//posting to database

app.use('/api/v1/product', productRoute )
app.use('/api/v1/brand', brandRoute)
app.use('/api/v1/store', storeRoute)


module.exports = app;
