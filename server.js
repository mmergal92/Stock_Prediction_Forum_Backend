/////////////////////////////////////////////////////////////
///////////// P R O J E C T  I I I  B A C K E N D ///////////
/////////////////////////////////////////////////////////////

// Import Dependencies 

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require('express-session');

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
app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false
}))
// Routes

app.get("/", (req, res) =>{
    req.session.test = 'hey'
    console.log(req.session.test)
    console.log('You have accessed the index page');
    res.send("Server Working!");

});


// Controllers
// const seedDataController = require('./controllers/seedData.js');
// app.use('/seed', seedDataController);

const apiStockDataController = require('./controllers/ApiStock.js');
app.use('/api', apiStockDataController);



const rssController = require('./controllers/rss.js')
app.use('/rss', rssController);

const signInController = require('./controllers/signIn');
app.use('/signIn', signInController);

const userController = require('./controllers/UserComments.js')
app.use('/user', userController)

// Declaring Ports

const PORT = process.env.PORT || 3000;

// Database Connection

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.once('open', () => {
    console.log('Linked to MongoDB')
})

// Server Listener

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
