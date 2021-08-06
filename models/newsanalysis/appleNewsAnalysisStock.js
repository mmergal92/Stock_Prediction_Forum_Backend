const mongoose = require('mongoose');

const appleNewsSentiment = new mongoose.Schema({
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

const appleNewsSentimentCollection = mongoose.model('AAPL News', appleNewsSentiment, 'AAPL News');

module.exports = appleNewsSentimentCollection;
