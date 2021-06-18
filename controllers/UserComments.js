// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');

// User Comment Collections

const userComment = require('../models/commentSchema.js');

// const commentSeedData for seeding user comments:
const commentSeedData = require('../models/commentSeedData')

// Middleware

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))

// Index Route

router.get('/', (req, res) =>{
    console.log(req.session.test)
    res.send('Add the company stock symbol to the URL e.g. user/stock/TSLA')
})


// Seed Data Route /user/seedUsers change the URL 

router.get("/seedUsers", (req, res) =>{
    userComment.create(commentSeedData, (err, createdComments) => {
           console.log(createdComments);
        res.redirect("/");
    })
});

// GET COMMENTS

router.get('/comments', (req, res) => {
    userComment.find({}, (error, Data) => {
        res.json(Data)
    })

});


// EXPORT
module.exports = router;