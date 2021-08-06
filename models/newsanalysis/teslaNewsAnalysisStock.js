const mongoose = require('mongoose');

const teslaNewsSentiment = new mongoose.Schema({
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

const teslaNewsSentimentCollection = mongoose.model('TSLA News', teslaNewsSentiment, 'TSLA News');

module.exports = teslaNewsSentimentCollection;
