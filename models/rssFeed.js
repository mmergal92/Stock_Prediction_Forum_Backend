const mongoose = require('mongoose');

const rssFeedSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    link: String,
    pubDate: String, 
}, );

const rssFeed = mongoose.model('rssFeed', rssFeedSchema);

module.exports = rssFeed;