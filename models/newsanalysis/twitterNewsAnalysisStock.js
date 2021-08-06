const mongoose = require('mongoose');

const twitterNewsSentiment = new mongoose.Schema({
    stock: String,
    date: String,
    hour: String,
    timezone: String,
    ratings: Array,
    overallScore: {
        type : { type: String },
        score: {type: Number},
    },
    ratios: {
        upPercent: {type: Number},
        downPercent: {type: Number},
    },
    price: Number

}, );

const twitterNewsSentimentCollection = mongoose.model('TWTR News', twitterNewsSentiment, 'TWTR News');

module.exports = twitterNewsSentimentCollection;
