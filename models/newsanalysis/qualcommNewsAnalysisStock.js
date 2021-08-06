const mongoose = require('mongoose');

const qualcommNewsSentiment = new mongoose.Schema({
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

const qualcommNewsSentimentCollection = mongoose.model('QCOM News', qualcommNewsSentiment, 'QCOM News');

module.exports = qualcommNewsSentimentCollection;
