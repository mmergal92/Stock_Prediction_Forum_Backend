const mongoose = require('mongoose');

const rssFeedAmazonSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    link: String,
    pubDate: String, 
}, );

const rssFeedAmazon = mongoose.model('rssFeedAmazon', rssFeedAmazonSchema);

module.exports = rssFeedAmazon;