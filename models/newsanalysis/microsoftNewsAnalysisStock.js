const mongoose = require('mongoose');

const microsoftNewsSentiment = new mongoose.Schema({
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

const microsoftNewsSentimentCollection = mongoose.model('MSFT News', microsoftNewsSentiment, 'MSFT News');

module.exports = microsoftNewsSentimentCollection;
