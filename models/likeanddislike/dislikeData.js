const mongoose = require('mongoose');

const disLikesSchema = new mongoose.Schema({
    email: String,
    symbol: String,
    user: String,
    type: String,
    date: {type: String}

    
}, );

const dislikesCollection = mongoose.model('disLikes', disLikesSchema, 'Dislikes');

module.exports = dislikesCollection;
