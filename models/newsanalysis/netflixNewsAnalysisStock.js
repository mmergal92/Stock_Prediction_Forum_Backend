const mongoose = require('mongoose');

const netflixNewsSentiment = new mongoose.Schema({
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

const netflixNewsSentimentCollection = mongoose.model('NFLX News', netflixNewsSentiment, 'NFLX News');

module.exports = netflixNewsSentimentCollection;
