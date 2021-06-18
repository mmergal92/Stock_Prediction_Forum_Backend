/////////////////////////////////////////////////////////////
///////////// P R O J E C T  I I I  B A C K E N D ///////////
/////////////////////////////////////////////////////////////

// Import Dependencies 

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const methodOverride = require("method-override");
require('dotenv').config();

// Create App Object

const app = express();

//Importing Models

// const hDataStock = require('./models/hDataStock');
const rssFeed = require('./models/rssFeed')

// Middleware 

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public')); // In 'public' folder we can put files to have access anywhere

// Routes

app.get("/", (req, res) =>{

    console.log('You have accessed the index page');
    res.send("Server Working!");

});

// Controllers
// const seedDataController = require('./controllers/seedData.js');
// app.use('/seed', seedDataController);

const rssController = require('./controllers/rss.js')
app.use('/rss', rssController);

// Declaring Ports

const PORT = process.env.PORT || 3000;

// Database Connection

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.once('open', () => {
    console.log('Linked to MongoDB')
})

// Server Listener

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
