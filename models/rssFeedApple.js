const mongoose = require('mongoose');

const rssFeedAppleSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    link: String,
    pubDate: String, 
}, );

const rssFeedApple = mongoose.model('rssFeedApple', rssFeedAppleSchema);

module.exports = rssFeedApple;