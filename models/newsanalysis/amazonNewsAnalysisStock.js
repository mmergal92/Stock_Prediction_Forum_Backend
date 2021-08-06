const mongoose = require('mongoose');

const amazonNewsSentiment = new mongoose.Schema({
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

const amazonNewsSentimentCollection = mongoose.model('AMZN News', amazonNewsSentiment, 'AMZN News');

module.exports = amazonNewsSentimentCollection;