const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    email: String,
    symbol: String,
    user: String,
    type: String,
    date: {type: String}

}, );

const likesCollection = mongoose.model('Likes', LikesSchema, 'Likes');

module.exports = likesCollection;
