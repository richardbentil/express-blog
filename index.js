const express = require('express');
const app = express();
const connectToDb = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const port = process.env.PORT || 3000;

//routes
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");


//load env variables
require('dotenv').config()

//connect to mongodb server
connectToDb()

//middleware to parse json data
app.use(express.json())

//create a simple get request
app.get("/", function(req, res) {
    res.send("Hello, World!");
})

app.use('/api/posts', postRoutes) //post routes

app.use('/api/auth', authRoutes) //authentication routes

//error handler
app.use(errorHandler)

//start the server
app.listen(port);