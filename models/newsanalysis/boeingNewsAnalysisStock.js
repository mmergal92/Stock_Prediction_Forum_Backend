const mongoose = require('mongoose');

const boeingNewsSentiment = new mongoose.Schema({
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

const boeingNewsSentimentCollection = mongoose.model('BA News', boeingNewsSentiment, 'BA News');

module.exports = boeingNewsSentimentCollection;
