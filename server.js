const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');


const app = require('./app');


//database connection

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log(`database connection is successful`);
})

//server 
app.get('/', (req,res)=>{
    console.log('server route is working properly')
    res.end("server is working fine")
})

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`App is running at port ${port}` .yellow.bold);
})